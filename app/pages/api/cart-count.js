import { createClient } from '@/utils/supabase/server'

export default async function handler(req, res) {
  try {
    const supabase = createClient()
    
    // Get the current user
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authData?.user) {
      return res.status(200).json({ count: 0 })
    }
    
    // Get the user's cart
    const { data: cartData, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("cart_owner_id", authData.user.id)
    
    if (cartError) {
      console.error("Error fetching cart:", cartError)
      return res.status(200).json({ count: 0 })
    }
    
    return res.status(200).json({ count: cartData?.length || 0 })
  } catch (error) {
    console.error("Server error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
