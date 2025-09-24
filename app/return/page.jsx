import { redirect } from 'next/navigation'

import { stripe } from '../../lib/stripe'

export default async function Return({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status !== 'complete') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      redirect('/my-orders')
    )
  }
}