import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  /* =======================
     Queries
  ======================= */

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs = [] } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  /* =======================
     Mutation
  ======================= */

  const { mutate: sendRequest, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  /* =======================
     Effects
  ======================= */

  useEffect(() => {
    const ids = new Set();
    outgoingFriendReqs.forEach((req) => {
      if (req?.recipient?._id) ids.add(req.recipient._id);
    });
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  /* =======================
     Render
  ======================= */

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">

        {/* Friends */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* Recommended Users */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Meet New Friends</h2>
            <p className="opacity-70">
              Discover new friends based on your profile
            </p>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg">
                No recommendations available
              </h3>
              <p className="opacity-70">Check back later</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                if (!user?._id) return null;
                const hasSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all"
                  >
                    <div className="card-body space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img
                            src={user.profilePic || "/avatar.png"}
                            alt={user.fullName}
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="badge badge-secondary">
                        {getLanguageFlag(user.nativeLanguage)}
                        Native: {capitialize(user.nativeLanguage)}
                      </span>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      <button
                        className={`btn w-full ${
                          hasSent ? "btn-disabled" : "btn-primary"
                        }`}
                        disabled={hasSent || isPending}
                        onClick={() => sendRequest(user._id)}
                      >
                        {hasSent ? (
                          <>
                            <CheckCircleIcon className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <UserPlusIcon className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
