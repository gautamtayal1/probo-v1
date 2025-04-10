'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useWebSocket } from '../hooks/useWebSockets';

export default function Portfolio() {

  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [orders, setOrders] = useState<any[]>([]);
  const {isConnected, subscribe, unsubscribe} = useWebSocket('ws://localhost:8081')
  
  useEffect(() => {

    const handler = (data: any) => {
      try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        console.log('Parsed WebSocket data:', parsedData);
    
        const { q, t } = parsedData;
    
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === t
              ? {
                  ...order,
                  executedQty: order.executedQty + Number(q),
                }
              : order
          )
        );
      } catch (error) {
        console.error('Error parsing WebSocket data:', error);
      }
    };
    
    console.log('Attempting to subscribe to fill channel');
    const isConnected = subscribe(`fill@${userId}`, handler);
    console.log('Subscription result:', isConnected);

    if (!isConnected) {
      console.warn('WebSocket not ready, scheduling retry in 500ms');
      const retry = setTimeout(() => {
        console.log('Retrying WebSocket subscription');
        subscribe(`fill@${userId}`, handler);
      }, 500);

      return () => {
        console.log('Clearing WebSocket retry timeout');
        clearTimeout(retry);
      };
    }

    return () => {
      console.log('Cleaning up WebSocket subscription');
      unsubscribe(`fill@${userId}`);
    };
  }, [isConnected, subscribe, unsubscribe, userId]);

  useEffect(() => {
    const fetchOrders = async() => {
      try {
        const response = await axios.post("http://localhost:8080/order/user", {
          userId
        }, {
          withCredentials: true
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setOrders([]);
      }
    }
    fetchOrders();
  }, [userId]);

  const handleCancelOrder = async(
    quantity: number, 
    market: string, 
    price: number, 
    executedQty: number, 
    id: string
  ) => {
    console.log("handle cancel entered")
    try {
      console.log(id, userId)
      const res = await axios.post("http://localhost:8080/order/cancel", {
        userId: session?.user.id,
        orderId: id,
        market,
        filled: executedQty, 
        price: Number(price),
        quantity: Number(quantity),
        type: "CANCEL_ORDER"
      })
      console.log(res)
      console.log("success")
    } catch (error) {
      console.log(error)
    }
    
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FILLED':
        return 'text-green-400';
      case 'partial':
        return 'text-yellow-400';
      case 'PENDING':
        return 'text-blue-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-[hsl(var(--muted))]';
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold">My Portfolio</h1>
          <p className="text-[hsl(var(--muted))]">Manage your predictions and track your performance</p>
        </div>

        {/* Portfolio Stats */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {[
            { label: 'Orders', value: orders.length },
            { label: 'Wallet', value: '₹2000' },
          ].map((stat, index) => (
            <div key={index} className="gradient-border card-shine rounded-xl bg-black/40 p-6">
              <p className="text-sm text-[hsl(var(--muted))]">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="gradient-border card-shine rounded-xl bg-black/40 p-6">
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20 text-left text-sm text-[hsl(var(--muted))]">
                  <th className="pb-4">Event</th>
                  <th className="pb-4">Side</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Filled</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {orders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
                          </div>
                          <div>
                            <p className="font-medium">{order.market}</p>
                          </div>
                        </div>
                    </td>
                    <td>
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                        order.side === 'YES' ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="font-medium">₹{order.price.toFixed(1)}</td>
                    <td>{order.quantity.toLocaleString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-purple-500/20">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${(order.executedQty / order.quantity) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-[hsl(var(--muted))]">
                        {`${((order.executedQty / order.quantity) * 100).toFixed(0)}%`}
                        
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`flex items-center gap-1 ${getStatusColor(order.quantity === order.executedQty ? "FILLED" : "PENDING")}`}>
                        {order.quantity === order.executedQty ? <CheckCircle2 className="h-4 w-4" />: <Calendar className="h-4 w-4" /> }
                        {order.quantity === order.executedQty ? "FILLED" : "PENDING"}
                      </span>
                    </td>
                    
                    <td>
                      {(
                        <button className="rounded-lg bg-red-500/20 px-3 py-1 text-sm font-medium text-red-400 opacity-0 transition-all group-hover:opacity-100"
                        onClick={() => handleCancelOrder(order.quantity, order.market, order.price, order.executedQty, order.id)}>
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}