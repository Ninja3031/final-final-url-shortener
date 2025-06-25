import { useState, useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link2, Copy, Check, Trash2, ExternalLink, BarChart3, Plus } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const fetchUserUrls = async () => {
  const response = await axiosInstance.get('/api/user/urls')
  return response.data.urls
}

const deleteUrl = async (id) => {
  await axiosInstance.delete(`/api/user/urls/${id}`)
}

const createShortUrl = async (data) => {
  const response = await axiosInstance.post('/api/create', data)
  return response.data
}

function DashboardPage() {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    }
  }, [isAuthenticated, navigate])

  const { data: urls = [], isLoading, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: fetchUserUrls,
    enabled: isAuthenticated,
  })

  const createMutation = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      queryClient.invalidateQueries(['userUrls'])
      setUrl('')
      setCustomSlug('')
      setShowCreateForm(false)
      toast.success('Short URL created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to create short URL')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUrl,
    onSuccess: () => {
      queryClient.invalidateQueries(['userUrls'])
      toast.success('URL deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to delete URL')
    }
  })

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    const data = { url: url.trim() }
    if (customSlug.trim()) {
      data.slug = customSlug.trim()
    }

    createMutation.mutate(data)
  }

  const copyToClipboard = async (shortUrl, id) => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopiedId(id)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      deleteMutation.mutate(id)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, {user?.name}! Manage your shortened URLs here.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total URLs</p>
              <p className="text-2xl font-bold">{urls.length}</p>
            </div>
            <Link2 className="h-8 w-8 text-primary-400" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Clicks</p>
              <p className="text-2xl font-bold">{urls.reduce((sum, url) => sum + url.clicks, 0)}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-primary-400" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg. Clicks</p>
              <p className="text-2xl font-bold">
                {urls.length > 0 ? Math.round(urls.reduce((sum, url) => sum + url.clicks, 0) / urls.length) : 0}
              </p>
            </div>
            <ExternalLink className="h-8 w-8 text-primary-400" />
          </div>
        </div>
      </div>

      {/* Create New URL Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Create New Short URL</span>
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Short URL</h2>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                Long URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                className="input"
                required
              />
            </div>

            <div>
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300 mb-2">
                Custom Slug (optional)
              </label>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-link"
                className="input"
                pattern="[a-zA-Z0-9-_]+"
                title="Only letters, numbers, hyphens, and underscores are allowed"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={createMutation.isPending}
                className="btn-primary flex items-center space-x-2"
              >
                <Link2 className="h-4 w-4" />
                <span>{createMutation.isPending ? 'Creating...' : 'Create Short URL'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* URLs List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Your URLs</h2>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-400 mt-2">Loading your URLs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">Failed to load URLs</p>
          </div>
        ) : urls.length === 0 ? (
          <div className="text-center py-8">
            <Link2 className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No URLs created yet</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary"
            >
              Create Your First URL
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {urls.map((urlItem) => (
              <div key={urlItem._id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <a
                        href={urlItem.fullShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:text-primary-300 font-medium truncate"
                      >
                        {urlItem.fullShortUrl}
                      </a>
                      <button
                        onClick={() => copyToClipboard(urlItem.fullShortUrl, urlItem._id)}
                        className="text-gray-400 hover:text-gray-300 flex-shrink-0"
                      >
                        {copiedId === urlItem._id ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{urlItem.full_url}</p>
                  </div>
                  <div className="flex items-center space-x-4 ml-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{urlItem.clicks} clicks</p>
                      <p className="text-xs text-gray-400">
                        {new Date(urlItem.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(urlItem._id)}
                      disabled={deleteMutation.isPending}
                      className="text-red-400 hover:text-red-300 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardPage
