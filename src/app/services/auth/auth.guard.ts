import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {SupabaseService} from '../supabase/supabase.service';

export const authGuard: CanActivateFn = (route, state) => {
   const supabaseService: SupabaseService = inject(SupabaseService);

  supabaseService.getUser()
  return true
};


