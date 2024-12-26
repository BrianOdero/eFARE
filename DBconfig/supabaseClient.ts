import {createClient} from "@supabase/supabase-js"

const key = process.env.EXPO_PUBLIC_ANON_KEY as string
const url = process.env.EXPO_PUBLIC_PROJECT_URL as string

const supabase = createClient(key,url)

export default supabase
