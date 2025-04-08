"use client"

import React, { useState } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

const PlaceOrder = () => {
  const [betType, setBetType] = useState<'yes' | 'no'>('yes')
  const [price, setPrice] = useState('0.65')
  const [quantity, setQuantity] = useState('100')
  const [orderStatus, setOrderStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handlePlaceOrder = () => {
    // Fake async request
    try {
      const success = Math.random() > 0.3 // 70% success chance
      if (success) {
        setOrderStatus('success')
      } else {
        throw new Error('Order failed')
      }
    } catch {
      setOrderStatus('error')
    }

    // Optionally reset after some time
    setTimeout(() => {
      setOrderStatus('idle')
    }, 4000)
  }

  return (
    <div>
      <div className="lg:col-span-1">
        <div className="gradient-border card-shine sticky top-24 rounded-xl bg-black/40 p-6">
          <h2 className="mb-6 text-xl font-bold">Place Order</h2>

          {/* Bet Type Selection */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <button
              onClick={() => setBetType('yes')}
              className={`flex items-center justify-center gap-2 rounded-lg p-3 font-semibold transition-all ${
                betType === 'yes'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-black/20 text-[hsl(var(--muted))] hover:bg-black/30'
              }`}
            >
              <ArrowUp className="h-4 w-4" />
              YES
            </button>
            <button
              onClick={() => setBetType('no')}
              className={`flex items-center justify-center gap-2 rounded-lg p-3 font-semibold transition-all ${
                betType === 'no'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-black/20 text-[hsl(var(--muted))] hover:bg-black/30'
              }`}
            >
              <ArrowDown className="h-4 w-4" />
              NO
            </button>
          </div>

          {/* Price Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-[hsl(var(--muted))]">
              Price (0.1-10)
            </label>
            <div 
              className="flex w-full items-center rounded-lg border border-purple-500/20 bg-black/20 text-white outline-none focus-within:border-purple-500/50"
            >
              <button
                className="px-3 py-3 hover:text-purple-400 text-xl"
                onClick={() => {
                  const newPrice = Math.max(0.1, Number(price) - 0.1);
                  setPrice(newPrice.toFixed(1));
                }}
              >
                -
              </button>
              <input
                value={price}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 0.1 && val <= 10) {
                    setPrice(e.target.value);
                  }
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
                  const newPrice = Math.min(10, Math.max(0.1, Number(price) + delta));
                  setPrice(newPrice.toFixed(1));
                }}
                step="0.1"
                min="0.1"
                max="10"
                className="w-full bg-transparent text-center outline-none"
              />
              <button
                className="px-3 py-3 hover:text-purple-400 text-xl"
                onClick={() => {
                  const newPrice = Math.min(10, Number(price) + 0.1);
                  setPrice(newPrice.toFixed(1));
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-[hsl(var(--muted))]">
              Quantity
            </label>
            <div
              className="flex w-full items-center rounded-lg border border-purple-500/20 bg-black/20 text-white outline-none focus-within:border-purple-500/50"
            >
              <button
                className="px-3 py-3 hover:text-purple-400 text-xl"
                onClick={() => {
                  const newQuantity = Math.max(1, Number(quantity) - 1);
                  setQuantity(newQuantity.toString());
                }}
              >
                -
              </button>
              <input
                value={quantity} 
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= 1) {
                    setQuantity(e.target.value);
                  }
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -1 : 1;
                  const newQuantity = Math.max(1, Number(quantity) + delta);
                  setQuantity(newQuantity.toString());
                }}
                min="1"
                className="w-full bg-transparent text-center outline-none"
              />
              <button
                className="px-3 py-3 hover:text-purple-400 text-xl"
                onClick={() => {
                  const newQuantity = Number(quantity) + 1;
                  setQuantity(newQuantity.toString());
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 rounded-lg bg-purple-500/10 p-4">
            <div className="flex items-center justify-between text-sm text-[hsl(var(--muted))]">
              <span>Total Cost</span>
              <span className="text-lg font-bold text-white">
                ${(Number(price) * Number(quantity)).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="glow w-full rounded-xl bg-[hsl(var(--primary))] py-4 text-lg font-semibold transition-all hover:bg-[hsl(var(--primary-hover))] hover:scale-[1.02]"
          >
            Place Order
          </button>

          {/* Status Message */}
          {orderStatus !== 'idle' && (
            <div
              className={`mt-4 rounded-lg p-3 text-sm font-medium ${
                orderStatus === 'success'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {orderStatus === 'success'
                ? '✅ Order placed successfully!'
                : '❌ Unable to place the order. Please try again.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
