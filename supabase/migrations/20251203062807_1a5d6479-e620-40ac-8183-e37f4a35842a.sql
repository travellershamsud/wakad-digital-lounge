-- Fix the user_id to use the actual UUID instead of email
UPDATE public.user_roles 
SET user_id = 'ab94b08d-1584-475a-95bc-512490ab00b9'
WHERE user_id = 'shamsud.ahmed@gmail.com';