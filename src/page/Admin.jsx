import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'

const BaseUrl = 'https://dantech-backend.onrender.com'

const navItems = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Projects',
    key: 'projects',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
      </svg>
    ),
  },
  {
    label: 'Post',
    key: 'post',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    ),
  },
  {
    label: 'Messages',
    key: 'users',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 01-9 8.5 9 9 0 01-4-1L3 21l1.9-5A8.4 8.4 0 013 11.5 8.4 8.4 0 0111.5 3 8.4 8.4 0 0121 11.5z" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    key: 'settings',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
      </svg>
    ),
  },
]

export default function Admin() {
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [selectedMessage, setSelectedMessage] = useState(null)

  const [dashLoading, setDashLoading] = useState(false)
  const [dashError, setDashError] = useState('')

  // ===== POST STATE =====
  const [posts, setPosts] = useState([])
  const [postForm, setPostForm] = useState({ title: '', description: '' })
  const [postImage, setPostImage] = useState(null)
  const [postImagePreview, setPostImagePreview] = useState('')
  const [postLoading, setPostLoading] = useState(false)
  const [postError, setPostError] = useState('')
  const [postSuccess, setPostSuccess] = useState('')
  const [postDeletingId, setPostDeletingId] = useState(null)
  const postFileRef = useRef(null)

  // Notifications
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notifOpen, setNotifOpen] = useState(false)

  // User dropdown
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  const socketRef = useRef(null)

  // ===== LOGOUT =====
  const handleLogout = () => {
    if (!window.confirm('Log out of DanTech admin?')) return
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    if (socketRef.current) socketRef.current.disconnect()
    navigate('/login', { replace: true })
  }

  // ===== AUTH GUARD =====
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  // ===== BODY SCROLL =====
  useEffect(() => {
    document.body.style.overflow = sidebarOpen || selectedMessage ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [sidebarOpen, selectedMessage])

  // ===== SIDEBAR RESIZE =====
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // ===== CLOSE USER MENU ON OUTSIDE CLICK =====
  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // ===== FETCH MESSAGES =====
  const fetchMessages = async (silent = false) => {
    if (!silent) setLoading(true)
    if (!silent) setError('')
    setDashError('')
    setDashLoading(!silent)
    try {
      const response = await fetch(`${BaseUrl}/api/contact`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to load data')
      const rawList = Array.isArray(data) ? data : data.contacts || []
      const list = rawList
        .map((m) => ({ ...m, _id: m._id || m.id }))
        .filter((m) => m._id)
      setMessages(list)
    } catch (err) {
      if (silent) setDashError(err.message)
      else setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setDashLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages(true)
  }, [])

  useEffect(() => {
    if (active === 'users') fetchMessages()
  }, [active])

  // ===== FETCH POSTS =====
 
// ===== FETCH POSTS =====

// ===== FETCH POSTS =====
const fetchPosts = async () => {
  setPostLoading(true);
  setPostError("");

  try {
    const response = await fetch(`${BaseUrl}/api/posts`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to load posts");
    }

    const rawList = Array.isArray(result)
      ? result
      : result.data || result.posts || [];

    const list = rawList.map((post) => {
      const postId = post._id || post.id;

      console.log("Post:", post.title);
      console.log("MongoDB ID:", postId);

      return {
        ...post,
        _id: postId ? String(postId).trim() : "",
      };
    }).filter((post) => post._id);

    console.log("All fetched posts:", list);

    setPosts(list);

  } catch (error) {
    console.error("Fetch Posts Error:", error);
    setPostError(error.message || "Something went wrong");
  } finally {
    setPostLoading(false);
  }
};


  useEffect(() => {
    if (active === 'post') fetchPosts()
  }, [active])

  // ===== SOCKET.IO =====
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    const socket = io(BaseUrl, {
      auth: { token },
      withCredentials: true,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('socket connected:', socket.id)
    })

    socket.on('new-message', (msg) => {
      console.log('NEW MESSAGE:', msg)
      const normalized = { ...msg, _id: msg._id || msg.id }
      setNotifications((prev) => [normalized, ...prev].slice(0, 20))
      setUnreadCount((c) => c + 1)
      setMessages((prev) => [normalized, ...prev])
    })

    socket.on('connect_error', (err) => {
      console.warn('socket error:', err.message)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  // ===== DELETE MESSAGE =====
  const deleteMessage = async (id) => {
    if (!id || id === 'undefined' || id === 'null') {
      alert('Cannot delete: message ID is missing.')
      return
    }
    if (!window.confirm('Delete this message permanently?')) return
    setDeletingId(id)
    try {
      const response = await fetch(`${BaseUrl}/api/contact/${id}`, { method: 'DELETE' })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.message || 'Failed to delete')
      setMessages((prev) => prev.filter((m) => (m._id || m.id) !== id))
      setNotifications((prev) => prev.filter((n) => (n._id || n.id) !== id))
      if (selectedMessage && (selectedMessage._id || selectedMessage.id) === id) {
        setSelectedMessage(null)
      }
    } catch (err) {
      alert(err.message || 'Could not delete message')
    } finally {
      setDeletingId(null)
    }
  }

  // ===== NOTIFICATION ACTIONS =====
  const toggleNotif = () => {
    setNotifOpen((v) => {
      const next = !v
      if (next) setUnreadCount(0)
      return next
    })
  }

  const handleNotificationClick = (n) => {
    setSelectedMessage({
      _id: n._id || n.id,
      name: n.name,
      email: n.email,
      subject: n.subject,
      message: n.message,
      createdAt: n.createdAt,
    })
    setNotifOpen(false)
  }

  // ===== POST IMAGE HANDLER =====
  const handlePostImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB')
      return
    }
    setPostImage(file)
    const reader = new FileReader()
    reader.onload = () => setPostImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const clearPostImage = () => {
    setPostImage(null)
    setPostImagePreview('')
    if (postFileRef.current) postFileRef.current.value = ''
  }

  // ===== CREATE POST =====

// ===== CREATE POST =====
const handleCreatePost = async (e) => {
  e.preventDefault();

  setPostError("");
  setPostSuccess("");

  // Validate form
  const title = postForm.title.trim();
  const description = postForm.description.trim();

  if (!title) {
    return setPostError("Title is required.");
  }

  if (!description) {
    return setPostError("Description is required.");
  }

  if (!postImage) {
    return setPostError("Please choose an image.");
  }

  // Create FormData
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", postImage);

  setPostLoading(true);

  try {
    const token = localStorage.getItem("token");

    console.log("Creating post...");
    console.log("Title:", title);
    console.log("Image:", postImage.name);
    console.log("Image size:", postImage.size);

    const response = await fetch(`${BaseUrl}/api/posts`, {
      method: "POST",
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
      body: formData,
    });

    // Read backend response
    const responseText = await response.text();

    let data;

    try {
      data = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error(
        `Server returned an invalid response (HTTP ${response.status})`
      );
    }

    console.log("POST STATUS:", response.status);
    console.log("POST RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.message || `Failed to create post (${response.status})`
      );
    }

    if (data.success === false) {
      throw new Error(data.message || "Post creation failed");
    }

    // Get newly created post
    const newPost = data.data || data.post;

    if (newPost && (newPost._id || newPost.id)) {
      const normalizedPost = {
        ...newPost,
        _id: String(newPost._id || newPost.id),
      };

      setPosts((prev) => [normalizedPost, ...prev]);
    } else {
      await fetchPosts();
    }

    // Reset form
    setPostForm({
      title: "",
      description: "",
    });

    clearPostImage();

    setPostSuccess("Post created successfully!");

    setTimeout(() => {
      setPostSuccess("");
    }, 4000);

  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    setPostError(
      error.message || "Something went wrong while creating the post."
    );

  } finally {
    setPostLoading(false);
  }
};

  // ===== DELETE POST =====
 
// ===== DELETE POST =====
const deletePost = async (postId) => {
  const id = String(postId || "").trim();

  console.log("DELETE POST ID:", id);

  if (!/^[a-fA-F0-9]{24}$/.test(id)) {
    console.error("Invalid MongoDB ID:", postId);
    alert("Invalid post ID. Please refresh your posts.");
    return;
  }

  if (!window.confirm("Delete this post permanently?")) return;

  setPostDeletingId(id);

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BaseUrl}/api/posts/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    const result = await response.json();

    console.log("Delete API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete post");
    }

    setPosts((previousPosts) =>
      previousPosts.filter(
        (post) => String(post._id || post.id) !== id
      )
    );

    alert("Post deleted successfully!");

  } catch (error) {
    console.error("Delete Post Error:", error);
    alert(error.message || "Could not delete post");
  } finally {
    setPostDeletingId(null);
  }
};

  // ===== STATS =====
  const totalMessages = messages.length
  const today = new Date()
  const todayCount = messages.filter((m) => {
    if (!m.createdAt) return false
    const d = new Date(m.createdAt)
    return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  }).length
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const weekCount = messages.filter((m) => m.createdAt && new Date(m.createdAt) >= weekAgo).length
  const uniqueEmails = new Set(messages.map((m) => (m.email || '').toLowerCase()).filter(Boolean)).size

  const stats = [
    { label: 'Total Messages', value: String(totalMessages), change: `${todayCount} today`, trend: todayCount > 0 ? 'up' : 'flat' },
    { label: 'This Week', value: String(weekCount), change: `${weekCount} in 7 days`, trend: weekCount > 0 ? 'up' : 'flat' },
    { label: 'Unique Senders', value: String(uniqueEmails), change: 'contacts', trend: 'flat' },
    { label: 'Today', value: String(todayCount), change: todayCount > 0 ? 'Active' : 'Quiet', trend: todayCount > 0 ? 'up' : 'flat' },
  ]

  // ===== MONTHLY CHART DATA =====
  const monthlyData = (() => {
    const now = new Date()
    const buckets = []
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      buckets.push({ label: d.toLocaleString('en-US', { month: 'short' }), year: d.getFullYear(), month: d.getMonth(), count: 0 })
    }
    messages.forEach((m) => {
      if (!m.createdAt) return
      const d = new Date(m.createdAt)
      if (isNaN(d.getTime())) return
      const b = buckets.find((x) => x.year === d.getFullYear() && x.month === d.getMonth())
      if (b) b.count += 1
    })
    return buckets
  })()
  const maxMonthly = Math.max(1, ...monthlyData.map((b) => b.count))
  const totalInChart = monthlyData.reduce((s, b) => s + b.count, 0)

  // ===== SUBJECTS =====
  const subjectBreakdown = (() => {
    const map = {}
    messages.forEach((m) => {
      const key = (m.subject || 'Other').trim() || 'Other'
      map[key] = (map[key] || 0) + 1
    })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, 5)
  })()
  const maxSubject = Math.max(1, ...subjectBreakdown.map(([, n]) => n))

  const recentActivity = messages.slice(0, 5).map((m) => ({
    text: `New message from ${m.name || 'Unknown'} — "${m.subject || 'No subject'}"`,
    time: m.createdAt ? timeAgo(new Date(m.createdAt)) : '',
  }))

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* ===== TOP BAR ===== */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((v) => !v)}
              className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              )}
            </button>

            <a href="/" className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#D4AF37] text-lg font-extrabold text-black">D</div>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                DanTech
                <span className="ml-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8a6d1f]">Admin</span>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              type="button"
              onClick={() => {
                fetchMessages(true)
                if (active === 'users') fetchMessages()
                if (active === 'post') fetchPosts()
              }}
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
              aria-label="Refresh"
            >
              <svg className={`h-5 w-5 ${dashLoading || loading || postLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
              </svg>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={toggleNotif}
                className="relative rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
                aria-label="Notifications"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl sm:w-96">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">Notifications</div>
                        <div className="text-xs text-gray-500">
                          {notifications.length === 0 ? 'No notifications' : `${notifications.length} recent`}
                        </div>
                      </div>
                      {notifications.length > 0 && (
                        <button
                          type="button"
                          onClick={() => { setNotifications([]); setUnreadCount(0) }}
                          className="text-xs font-medium text-[#8a6d1f] hover:underline"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-10 text-center">
                          <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#D4AF37]/10">
                            <svg className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="mt-2 text-sm font-medium text-gray-700">No new notifications</p>
                          <p className="mt-0.5 text-xs text-gray-500">You're all caught up.</p>
                        </div>
                      ) : (
                        notifications.map((n) => {
                          const nid = n._id || n.id
                          return (
                            <button
                              key={nid}
                              type="button"
                              onClick={() => handleNotificationClick(n)}
                              className="flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition hover:bg-gray-50 last:border-b-0"
                            >
                              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#D4AF37]/15 text-xs font-bold text-[#8a6d1f]">
                                {(n.name || '?').charAt(0).toUpperCase()}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-900">New message from {n.name}</div>
                                <div className="mt-0.5 truncate text-xs text-gray-600">{n.subject}</div>
                                <div className="mt-0.5 text-[11px] text-gray-400">{n.createdAt ? timeAgo(new Date(n.createdAt)) : ''}</div>
                              </div>
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                            </button>
                          )
                        })
                      )}
                    </div>

                    <div className="border-t border-gray-100 px-4 py-2.5">
                      <button
                        type="button"
                        onClick={() => { setActive('users'); setNotifOpen(false) }}
                        className="w-full rounded-md py-1.5 text-center text-xs font-semibold text-[#8a6d1f] hover:bg-[#D4AF37]/10"
                      >
                        View all messages
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* USER DROPDOWN */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1 pl-1 pr-3 transition hover:bg-gray-100"
                aria-haspopup="menu"
                aria-expanded={userMenuOpen}
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[#D4AF37] text-sm font-bold text-black">A</div>
                <span className="hidden text-sm font-medium text-gray-700 sm:block">Admin</span>
                <svg className={`h-4 w-4 text-gray-500 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <div className="text-sm font-semibold text-gray-900">Admin</div>
                    <div className="truncate text-xs text-gray-500">danid93575@gmail.com</div>
                  </div>

                  <div className="p-1">
                    <button
                      type="button"
                      onClick={() => { setActive('settings'); setUserMenuOpen(false) }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path strokeLinecap="round" d="M4 20a8 8 0 0116 0" />
                      </svg>
                      Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => { setActive('settings'); setUserMenuOpen(false) }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
                      </svg>
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-gray-100 p-1">
                    <button
                      type="button"
                      onClick={() => { setUserMenuOpen(false); handleLogout() }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7M13 20H6a2 2 0 01-2-2V6a2 2 0 012-2h7" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <div
          onClick={() => setSidebarOpen(false)}
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
            sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        />

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-gray-200 bg-white p-4 shadow-xl transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:sticky lg:top-16 lg:z-10 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 lg:shadow-none`}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="text-sm font-semibold uppercase tracking-wider text-gray-500">Menu</span>
            <button type="button" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => { setActive(item.key); setSidebarOpen(false) }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active === item.key ? 'bg-[#D4AF37]/15 text-[#8a6d1f]' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className={active === item.key ? 'text-[#8a6d1f]' : 'text-gray-400'}>{item.icon}</span>
                {item.label}
                {item.key === 'users' && unreadCount > 0 && (
                  <span className="ml-auto grid h-5 min-w-[20px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/5 p-4">
            <div className="text-sm font-semibold text-[#8a6d1f]">Need help?</div>
            <p className="mt-1 text-xs text-gray-600">Check the docs or contact support.</p>
            <a href="/contact" className="mt-3 inline-block rounded-md bg-[#D4AF37] px-3 py-1.5 text-xs font-semibold text-black transition hover:bg-[#F5D76E]">
              Contact support
            </a>
          </div>
        </aside>

        {/* ===== MAIN ===== */}
        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">

          {/* DASHBOARD */}
          {active === 'dashboard' && (
            <>
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-500">Real-time overview from your contact messages.</p>
                </div>
                <button
                  type="button"
                  onClick={() => fetchMessages(true)}
                  disabled={dashLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
                >
                  <svg className={`h-4 w-4 ${dashLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
                  </svg>
                  Refresh
                </button>
              </div>

              {dashError && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{dashError}</div>
              )}

              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{s.label}</div>
                    <div className="mt-2 text-3xl font-extrabold text-gray-900">{s.value}</div>
                    <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
                      s.trend === 'up' ? 'text-emerald-600' : s.trend === 'down' ? 'text-rose-600' : 'text-gray-500'
                    }`}>
                      {s.trend === 'up' && (
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                      {s.change}
                    </div>
                  </div>
                ))}
              </section>

              <section className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Messages per month</h2>
                      <p className="mt-0.5 text-xs text-gray-500">Last 6 months</p>
                    </div>
                    <div className="rounded-lg bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#8a6d1f]">{totalInChart} total</div>
                  </div>
                  {dashLoading ? (
                    <div className="mt-6 h-56 animate-pulse rounded-lg bg-gray-100" />
                  ) : (
                    <MonthLineChart data={monthlyData} max={maxMonthly} />
                  )}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Top subjects</h2>
                  <p className="mt-0.5 text-xs text-gray-500">Most requested topics</p>
                  {dashLoading ? (
                    <div className="mt-4 space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                          <div className="h-2 w-full animate-pulse rounded-full bg-gray-100" />
                        </div>
                      ))}
                    </div>
                  ) : subjectBreakdown.length === 0 ? (
                    <p className="mt-6 text-sm text-gray-500">No subjects yet.</p>
                  ) : (
                    <ul className="mt-4 space-y-3">
                      {subjectBreakdown.map(([subject, count]) => {
                        const pct = (count / maxSubject) * 100
                        return (
                          <li key={subject}>
                            <div className="flex items-center justify-between text-xs">
                              <span className="truncate font-medium text-gray-700">{subject}</span>
                              <span className="ml-2 shrink-0 text-gray-500">{count}</span>
                            </div>
                            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                              <div className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] transition-all duration-500" style={{ width: `${pct}%` }} />
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </section>

              <section className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
                  <ul className="mt-4 space-y-4">
                    {recentActivity.length === 0 ? (
                      <li className="text-sm text-gray-500">No activity yet.</li>
                    ) : (
                      recentActivity.map((a, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                          <div>
                            <div className="text-sm text-gray-800">{a.text}</div>
                            <div className="text-xs text-gray-500">{a.time}</div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                  <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent messages</h2>
                    <button onClick={() => setActive('users')} className="text-sm font-medium text-[#8a6d1f] hover:underline">
                      View all
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    {messages.length === 0 ? (
                      <div className="p-10 text-center text-sm text-gray-500">No messages yet.</div>
                    ) : (
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                          <tr>
                            <th className="px-5 py-3 font-medium">From</th>
                            <th className="px-5 py-3 font-medium">Subject</th>
                            <th className="px-5 py-3 font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {messages.slice(0, 5).map((m) => {
                            const id = m._id || m.id
                            return (
                              <tr key={id} onClick={() => setSelectedMessage(m)} className="cursor-pointer transition hover:bg-gray-50">
                                <td className="px-5 py-4">
                                  <div className="flex items-center gap-2">
                                    <div className="grid h-7 w-7 place-items-center rounded-full bg-[#D4AF37]/20 text-[10px] font-bold text-[#8a6d1f]">
                                      {(m.name || '?').charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="truncate font-medium text-gray-900">{m.name || '—'}</div>
                                      <div className="truncate text-xs text-gray-500">{m.email || '—'}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-4 text-gray-600"><span className="line-clamp-1">{m.subject || '—'}</span></td>
                                <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                                  {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : '—'}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </section>
            </>
          )}

          {/* POST */}
          {active === 'post' && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Post</h1>
                  <p className="mt-1 text-sm text-gray-500">Create and manage posts with images.</p>
                </div>
                <button
                  type="button"
                  onClick={fetchPosts}
                  disabled={postLoading}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
                >
                  <svg className={`h-4 w-4 ${postLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
                  </svg>
                  Refresh
                </button>
              </div>

              {postError && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{postError}</div>
              )}
              {postSuccess && (
                <div className="mb-4 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{postSuccess}</div>
              )}

              <div className="grid gap-6 lg:grid-cols-3">
                {/* CREATE FORM */}
                <form onSubmit={handleCreatePost} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:col-span-1">
                  <h2 className="text-lg font-semibold text-gray-900">New post</h2>

                  {/* IMAGE UPLOAD */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Image *</label>
                    <div
                      onClick={() => postFileRef.current?.click()}
                      className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                    >
                      {postImagePreview ? (
                        <>
                          <img src={postImagePreview} alt="preview" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); clearPostImage() }}
                            className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition hover:bg-black/80"
                            aria-label="Remove image"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <div className="p-6 text-center">
                          <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-2 text-xs font-medium text-gray-600">Click to upload image</p>
                          <p className="mt-0.5 text-[11px] text-gray-400">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={postFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePostImageChange}
                      className="hidden"
                    />
                  </div>

                  {/* TITLE */}
                  <div>
                    <label htmlFor="post-title" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Title *</label>
                    <input
                      id="post-title"
                      type="text"
                      value={postForm.title}
                      onChange={(e) => setPostForm((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Post title"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label htmlFor="post-desc" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500">Description *</label>
                    <textarea
                      id="post-desc"
                      rows={5}
                      value={postForm.description}
                      onChange={(e) => setPostForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Write something..."
                      required
                      className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={postLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#F5D76E] disabled:opacity-60"
                  >
                    {postLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" d="M12 3a9 9 0 109 9" />
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Publish post
                      </>
                    )}
                  </button>
                </form>

                {/* POSTS LIST */}
                <div className="lg:col-span-2">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">All posts</h2>
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
                      {posts.length}
                    </span>
                  </div>

                  {postLoading ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white">
                          <div className="aspect-video bg-gray-200" />
                          <div className="space-y-2 p-4">
                            <div className="h-4 w-3/4 rounded bg-gray-200" />
                            <div className="h-3 w-full rounded bg-gray-100" />
                            <div className="h-3 w-2/3 rounded bg-gray-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#D4AF37]/10">
                        <svg className="h-7 w-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">No posts yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Use the form to create your first post.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {posts.map((p) => {
                        const id = p._id || p.id
                        return (
                          <div key={id} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-[#D4AF37]/60 hover:shadow-md">
                            <div className="aspect-video overflow-hidden bg-gray-100">
                              {p.image ? (
                                <img
                                  src={p.image}
                                  alt={p.title}
                                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                              ) : (
                                <div className="grid h-full w-full place-items-center text-gray-400">
                                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.6-4.6a2 2 0 012.8 0L16 16m-2-2l1.6-1.6a2 2 0 012.8 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                              <span className="text-[11px] font-medium text-gray-400">
                                {p.date ? new Date(p.date).toLocaleDateString() : p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}
                              </span>
                              <h3 className="mt-1 line-clamp-2 font-semibold text-gray-900">{p.title || 'Untitled'}</h3>
                              <p className="mt-1 line-clamp-3 flex-1 text-sm text-gray-600">{p.description || ''}</p>
                              <div className="mt-3 flex justify-end border-t border-gray-100 pt-3">
                                <button
                                  type="button"
                                  onClick={() => deletePost(id)}
                                  disabled={!id || postDeletingId === id}
                                  className="rounded-md px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                                >
                                  {postDeletingId === id ? 'Deleting...' : 'Delete'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* MESSAGES */}
          {active === 'users' && (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Messages</h1>
                  <p className="mt-1 text-sm text-gray-500">Contact form submissions from your website.</p>
                </div>
                <button
                  type="button"
                  onClick={() => fetchMessages()}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F5D76E] disabled:opacity-60"
                >
                  <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3" />
                  </svg>
                  Refresh
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              )}

              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5">
                      <div className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="mt-3 h-4 w-2/3 rounded bg-gray-200" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
                      <div className="mt-4 h-3 w-full rounded bg-gray-100" />
                      <div className="mt-2 h-3 w-5/6 rounded bg-gray-100" />
                    </div>
                  ))}
                </div>
              ) : messages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#D4AF37]/10">
                    <svg className="h-7 w-7 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.4 8.4 0 01-9 8.5 9 9 0 01-4-1L3 21l1.9-5A8.4 8.4 0 013 11.5 8.4 8.4 0 0111.5 3 8.4 8.4 0 0121 11.5z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-500">When someone submits the contact form, it will appear here.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {messages.map((m) => {
                    const id = m._id || m.id
                    return (
                      <div key={id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-[#D4AF37]/60 hover:shadow-md">
                        <div className="h-1 w-full bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#D4AF37]" />
                        <div className="flex flex-1 flex-col p-5">
                          <div className="flex items-start gap-3">
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#D4AF37]/15 text-sm font-bold text-[#8a6d1f]">
                              {(m.name || '?').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-semibold text-gray-900">{m.name || '—'}</div>
                              <div className="truncate text-xs text-gray-500">{m.email || '—'}</div>
                            </div>
                          </div>

                          {m.subject && (
                            <div className="mt-4 inline-block w-fit rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-2.5 py-0.5 text-xs font-medium text-[#8a6d1f]">
                              {m.subject}
                            </div>
                          )}

                          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{m.message || '—'}</p>

                          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-xs text-gray-500">
                              {m.createdAt ? new Date(m.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedMessage(m)}
                                className="rounded-md px-2.5 py-1 text-xs font-semibold text-[#8a6d1f] transition hover:bg-[#D4AF37]/10"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteMessage(id)}
                                disabled={deletingId === id}
                                className="rounded-md px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                              >
                                {deletingId === id ? 'Deleting...' : 'Delete'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {!loading && messages.length > 0 && (
                <p className="mt-6 text-xs text-gray-500">
                  Total: {messages.length} {messages.length === 1 ? 'message' : 'messages'}
                </p>
              )}
            </>
          )}

          {!['dashboard', 'post', 'users'].includes(active) && (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 capitalize">{active}</h2>
              <p className="mt-2 text-sm text-gray-500">This section is coming soon.</p>
            </div>
          )}
        </main>
      </div>

      {/* ===== VIEW DETAIL MODAL ===== */}
      {selectedMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#D4AF37]/30 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#D4AF37]/15 text-lg font-bold text-[#8a6d1f]">
                  {(selectedMessage.name || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedMessage.name || '—'}</h3>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm text-[#8a6d1f] hover:underline">
                    {selectedMessage.email || '—'}
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-5">
              {selectedMessage.subject && (
                <div className="mb-4 inline-block rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#8a6d1f]">
                  {selectedMessage.subject}
                </div>
              )}

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Message</div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-800">{selectedMessage.message || '—'}</p>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span>
                  <span className="font-semibold text-gray-700">Received:</span>{' '}
                  {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : '—'}
                </span>
                <span>
                  <span className="font-semibold text-gray-700">ID:</span>{' '}
                  {selectedMessage._id || selectedMessage.id || '—'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Your message')}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#F5D76E]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.9 5.3a2 2 0 002.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Reply by email
              </a>
              <button
                type="button"
                onClick={() => deleteMessage(selectedMessage._id || selectedMessage.id)}
                disabled={deletingId === (selectedMessage._id || selectedMessage.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-60"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.9 12.1a2 2 0 01-2 1.9H7.9a2 2 0 01-2-1.9L5 7M10 11v6M14 11v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16" />
                </svg>
                Delete
              </button>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ===== LINE/AREA CHART =====
function MonthLineChart({ data, max }) {
  const width = 600
  const height = 220
  const padX = 30
  const padTop = 20
  const padBottom = 40
  const innerW = width - padX * 2
  const innerH = height - padTop - padBottom

  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0
  const points = data.map((b, i) => {
    const x = padX + i * stepX
    const y = padTop + innerH - (b.count / Math.max(max, 1)) * innerH
    return { x, y, ...b }
  })

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath =
    `M ${points[0].x} ${padTop + innerH} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${points[points.length - 1].x} ${padTop + innerH} Z`

  const tickCount = Math.min(Math.max(max, 1), 5)
  const ticks = [...new Set(Array.from({ length: tickCount + 1 }, (_, i) => Math.round((i / tickCount) * max)))]
  const gridLines = ticks.map((value) => ({
    y: padTop + innerH - (value / Math.max(max, 1)) * innerH,
    value,
  }))

  return (
    <div className="mt-4 w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full overflow-visible">
        <defs>
          <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F5D76E" />
          </linearGradient>
        </defs>

        {gridLines.map((g, i) => (
          <g key={i}>
            <line x1={padX} x2={width - padX} y1={g.y} y2={g.y} stroke="#e5e7eb" strokeDasharray="3 3" />
            <text x={padX - 8} y={g.y + 3} fontSize="10" fill="#9ca3af" textAnchor="end">{g.value}</text>
          </g>
        ))}

        <path d={areaPath} fill="url(#goldArea)" />
        <path d={linePath} fill="none" stroke="url(#goldStroke)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke="#D4AF37" strokeWidth="2.5" />
            <text x={p.x} y={p.y - 12} fontSize="11" fontWeight="700" fill={p.count === 0 ? '#9ca3af' : '#8a6d1f'} textAnchor="middle">{p.count}</text>
            <text x={p.x} y={height - 12} fontSize="11" fill="#6b7280" textAnchor="middle">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ===== HELPER =====
function timeAgo(date) {
  if (!date || isNaN(new Date(date).getTime())) return ''
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}
