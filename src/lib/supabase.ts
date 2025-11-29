import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tjgaskhafefygiztmffg.supabase.co' // örnek: https://xyzcompany.supabase.co
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZ2Fza2hhZmVmeWdpenRtZmZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0MjY1NDgsImV4cCI6MjA4MDAwMjU0OH0.xSkCO5oF_MoHItB1LkCOGuuOBO-FVGVJbj1Mlk93n_g'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface TestOnerisi {
  id?: string
  film_dizi: string
  created_at?: string
}