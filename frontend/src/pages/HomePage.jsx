import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { Link2, Copy, Check, Zap, Shield, BarChart3 } from 'lucide-react'
import axiosInstance from '../utils/axiosInstance'
import toast from 'react-hot-toast'

const createShortUrl = async (data) => {
  const response = await axiosInstance.post('/api/create', data)
  return response.data
}

function HomePage() {
  const [url, setUrl] = useState('')
  const [customSlug, setCustomSlug] = useState('')
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const mutation = useMutation({
    mutationFn: createShortUrl,
    onSuccess: (data) => {
      setResult(data)
      setUrl('')
      setCustomSlug('')
      toast.success('Short URL created successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || 'Failed to create short URL')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url.trim()) {
      toast.error('Please enter a URL')
      return
    }

    const data = { url: url.trim() }
    if (isAuthenticated && customSlug.trim()) {
      data.slug = customSlug.trim()
    }

    mutation.mutate(data)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result.shortUrl)
      setCopied(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Shorten Your URLs
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Create short, memorable links that are easy to share. Track clicks and manage your URLs with our powerful dashboard.
        </p>
      </div>

      {/* URL Shortener Form */}
      <div className="card mb-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
              Enter your long URL
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

          {isAuthenticated && (
            <div>
              <label htmlFor="customSlug" className="block text-sm font-medium text-gray-300 mb-2">
                Custom slug (optional)
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
              <p className="text-sm text-gray-500 mt-1">
                Only letters, numbers, hyphens, and underscores are allowed
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Link2 className="h-5 w-5" />
            <span>{mutation.isPending ? 'Creating...' : 'Shorten URL'}</span>
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-lg font-semibold mb-4 text-green-400">Your shortened URL:</h3>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={result.shortUrl}
                readOnly
                className="input flex-1"
              />
              <button
                onClick={copyToClipboard}
                className="btn-secondary flex items-center space-x-2"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-400">
            Create short URLs instantly with our optimized infrastructure
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
          <p className="text-gray-400">
            Your links are protected with enterprise-grade security
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analytics</h3>
          <p className="text-gray-400">
            Track clicks and analyze your link performance
          </p>
        </div>
      </div>

      {/* CTA Section */}
      {!isAuthenticated && (
        <div className="card text-center">
          <h2 className="text-2xl font-bold mb-4">Want more features?</h2>
          <p className="text-gray-400 mb-6">
            Sign up for free to get custom slugs, analytics, and link management
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/register" className="btn-primary">
              Sign Up Free
            </a>
            <a href="/login" className="btn-secondary">
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
