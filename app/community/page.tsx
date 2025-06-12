"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Users, MessageCircle, Heart, Clock, Plus, Filter } from "lucide-react";
import useAuthStore from "@/store/auth.store";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CommentBox from "@/components/ui/CommentBox";
import { postApi } from "@/utils/api.utils";

export default function CommunityPage() {
  type Post = {
    _id: string;
    title: string;
    preview: string;
    category: string;
    author: string;
    time: string;
    replies: number;
    likes: number;
  };
  type LikeData = {
    _id: string;
    postId: string;
    userMail: string;
  };
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [visibilityPostComment, setVisibilityPostComment] = useState<{
    [key: string]: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const invertToggle = (postId: string) => {
    setVisibilityPostComment((prev) => {
      return {
        ...prev,
        [postId]: !prev[postId],
      };
    });
  };

  // const [postTitle, setPostTitle] = useState("");
  // const [postContent, setPostContent] = useState("");
  // const [title, setTitle] = useState("");
  // const [category, setTcategory] = useState("");
  // const [preview, setPreview] = useState("");
  const [postdata, setPostdata] = useState({
    title: "",
    category: "",
    preview: "",
  });
  const [isLiked, setIsLiked] = useState(false);
  const [activePosts, setActivePosts] = useState<Post[]>([]);
  const [likedata, setLikedata] = useState<LikeData[]>([]);
  const token = useAuthStore((state) => {
    return state.token;
  });
  const mail = useAuthStore((state) => {
    return state.email;
  });
  useEffect(() => {
    const ping = async () => {
      const response = await fetch(
        "https://mentalsaathi-express-backend.onrender.com/api/v1/admin/ping",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
    };

    ping();
    const interval = setInterval(ping, 60000); // every 1 min

    return () => clearInterval(interval);
  }, []);
  function formatTimeAgo(postTime: string): string {
    const diff = Date.now() - new Date(postTime).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days = Math.floor(diff / 86_400_000);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes} minute(s) ago`;
    if (hours < 24) return `${hours} hour(s) ago`;
    return `${days} day(s) ago`;
  }
  type comment = {
    _id: string;
    postId: string;
    userName: string;
    comment: string;
  };
  const [commentData, setCommentData] = useState<comment[]>([]);
  const getLikeData = async () => {
    postApi
      .get("/get-post-likes", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLikedata(response.data.likeData);
      })
      .catch((error) => {
        // toast.error(error.response.data.message);
        console.log(error);
      });
  };
  const getCommentData = async () => {
    postApi
      .get("/get-comment")
      .then((response) => {
        setCommentData(response.data.commentData);
        console.log(commentData);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const getData = async () => {
    postApi
      .get("/get-community")
      .then((res) => {
        setActivePosts(res.data.communityPostData);
        // console.log(activePosts);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const categories = [
    {
      name: "Anxiety",
      count: activePosts.filter((item) => {
        return item.category === "Anxiety";
      }).length,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "College Life",
      count: activePosts.filter((item) => {
        return item.category === "College Life";
      }).length,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Friendships",
      count: activePosts.filter((item) => {
        return item.category === "Friendships";
      }).length,
      color: "bg-pink-100 text-pink-700",
    },
    {
      name: "Academic Stress",
      count: activePosts.filter((item) => {
        return item.category === "Academic Stress";
      }).length,
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Family Issues",
      count: activePosts.filter((item) => {
        return item.category === "Family Issues";
      }).length,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Self-Esteem",
      count: activePosts.filter((item) => {
        return item.category === "Self-Esteem";
      }).length,
      color: "bg-indigo-100 text-indigo-700",
    },
  ];
  useEffect(() => {
    getData();
    getLikeData();
    getCommentData();
    console.log(commentData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              You're{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                never alone.
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Join discussions, share anonymously, or just listen.
            </p>
            <Button
              onClick={() => setShowPostForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Start a Conversation
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-purple-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Filter className="w-5 h-5 text-purple-500" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Topics
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={
                      selectedCategory === category.name ? "default" : "ghost"
                    }
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className={category.color}>
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Anonymous Posting Interface */}
            {showPostForm && (
              <form
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (isSubmitting) return;

                  setIsSubmitting(true);
                  postApi
                    .post("/community", postdata, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                      },
                    })
                    .then((response) => {
                      setPostdata((prev) => ({
                        ...prev,
                        title: "",
                        preview: "",
                        category: "",
                      }));
                      setShowPostForm(false);
                      // router.replace("/community");
                      // console.log(response);
                      getData();
                    })
                    .catch((error) => {
                      console.log(error.response.data.message);
                      // console.log(postdata);
                    })
                    .finally(() => {
                      setIsSubmitting(false);
                    });
                }}
              >
                <Card className="border-green-100 shadow-lg bg-green-50/50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">
                      Share Your Thoughts Anonymously
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="What's on your mind?"
                      onChange={(event) => {
                        setPostdata((prev) => ({
                          ...prev,
                          title: event.target.value,
                        }));
                      }}
                      className="border-green-200 focus:border-green-300"
                    />
                    <Textarea
                      onChange={(event) => {
                        setPostdata((prev) => ({
                          ...prev,
                          preview: event.target.value,
                        }));
                      }}
                      placeholder="Share your story... This is a safe space."
                      className="min-h-[120px] border-green-200 focus:border-green-300 resize-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.name}
                          variant="outline"
                          onClick={(event) => {
                            event.preventDefault();
                            setPostdata((prev) => ({
                              ...prev,
                              category: category.name,
                            }));
                          }}
                          className="cursor-pointer hover:bg-gray-100"
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full flex-1"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Post in community
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowPostForm(false)}
                        className="rounded-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            )}

            {/* Active Topics */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Active Topics
                </h2>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {activePosts.length} discussions
                </Badge>
              </div>

              {activePosts.map((post) => (
                <Card
                  key={post._id}
                  className="border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {post.preview}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="ml-4 bg-purple-50 text-purple-700"
                        >
                          {post.category}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{post.author}</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTimeAgo(post.time)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <a
                            href="#"
                            onClick={(event) => {
                              event.preventDefault();
                              invertToggle(post._id);
                            }}
                            className="flex items-center gap-1"
                          >
                            <MessageCircle
                              fill={
                                visibilityPostComment[post._id]
                                  ? "black"
                                  : "white"
                              }
                              className="w-4 h-4 border-black"
                            />
                          </a>
                          <span>
                            {visibilityPostComment[post._id] ? (
                              <CommentBox
                                data={commentData.filter((item) => {
                                  return item.postId === post._id;
                                })}
                                onSubmit={async (comment: string) => {
                                  postApi
                                    .post(
                                      `/comment/${post._id}`,
                                      {
                                        comment: comment,
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                          Authorization: `Bearer ${token}`,
                                        },
                                      }
                                    )
                                    .then(() => {
                                      getCommentData();
                                      
                                    })
                                    .catch(() => {});
                                }}
                              />
                            ) : (
                              commentData.filter((item) => {
                                return item.postId === post._id;
                              }).length
                            )}
                          </span>
                          <button
                            onClick={async () => {
                              // setIsLiked(!isLiked);
                              postApi
                                .post(
                                  `/like/${post._id}`,
                                  {},
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization: `Bearer ${token}`,
                                    },
                                  }
                                )
                                .then((response) => {
                                  toast.success(response.data.message);
                                  router.refresh();
                                  getLikeData();
                                  if (
                                    response.data.message === "post is liked"
                                  ) {
                                    setIsLiked(true);
                                  } else {
                                    setIsLiked(false);
                                  }
                                })
                                .catch((error) => {
                                  toast.error(error.response.data.message);
                                  router.push("/login");
                                });
                            }}
                            className="flex items-center gap-1"
                          >
                            <Heart
                              fill={
                                likedata
                                  .filter((item) => item.postId === post._id)
                                  .filter((jtem) => {
                                    return jtem.userMail === mail;
                                  }).length === 1
                                  ? "red"
                                  : "white"
                              }
                              className="w-4 h-4 text-red-800"
                            />
                            <span>
                              {
                                likedata.filter(
                                  (item) => item.postId === post._id
                                ).length
                              }
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Guidelines */}
            <Card className="border-yellow-100 shadow-lg bg-yellow-50/50">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-600" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Be kind and respectful to all community members</li>
                  <li>• Keep discussions supportive and constructive</li>
                  <li>• Respect anonymity and privacy</li>
                  <li>• No judgment, only understanding and support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
