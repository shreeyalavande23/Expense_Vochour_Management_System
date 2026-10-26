
import { useState } from 'react'
import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [vouchers, setVouchers] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    category: 'Travel',
    description: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newVoucher = {
      ...formData,
      id: Date.now(),
      status: 'Pending',
    }

    setVouchers([...vouchers, newVoucher])

    setFormData({
      title: '',
      amount: '',
      date: '',
      category: 'Travel',
      description: '',
    })

    setShowForm(false)
    alert('Expense voucher submitted successfully!')
  }

  return (
    <div className="app">
      <h1>Expense Voucher Management System</h1>
      <p>Welcome to the Expense Management Portal</p>

      <div className="dashboard">
        <div className="card">
          <h2>My Vouchers</h2>
          <p>View and manage your expense vouchers.</p>
          <button onClick={() => setShowForm(false)}>
            View Vouchers ({vouchers.length})
          </button>
        </div>

        <div className="card">
          <h2>Create Voucher</h2>
          <p>Submit a new expense reimbursement request.</p>
          <button onClick={() => setShowForm(true)}>
            Create New Voucher
          </button>
        </div>

        <div className="card">
          <h2>Pending Approvals</h2>
          <p>Track vouchers waiting for approval.</p>
          <button onClick={() => alert(
            `${vouchers.filter(v => v.status === 'Pending').length} voucher(s) pending approval.`
          )}>
            View Status
          </button>
        </div>
      </div>

      {showForm && (
        <div className="voucher-form">
          <h2>Create Expense Voucher</h2>

          <form onSubmit={handleSubmit}>
            <label>Expense Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Client meeting travel"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              min="1"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <label>Expense Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Other">Other</option>
            </select>

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Explain your expense..."
              value={formData.description}
              onChange={handleChange}
              required
            />

            <div className="form-buttons">
              <button type="submit">Submit Voucher</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!showForm && vouchers.length > 0 && (
        <div className="voucher-list">
          <h2>My Submitted Vouchers</h2>

          {vouchers.map((voucher) => (
            <div className="voucher-item" key={voucher.id}>
              <h3>{voucher.title}</h3>
              <p>Amount: ₹{voucher.amount}</p>
              <p>Date: {voucher.date}</p>
              <p>Category: {voucher.category}</p>
              <p>Status: <strong>{voucher.status}</strong></p>
              <p>Description: {voucher.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App