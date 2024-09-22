import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const sihValidate = (data: any) => {
  if (!data) {
    return { error: 'No data provided' }
  }
  if (!data.team_info) {
    return { error: 'team_info is required' }
  }
  if (!data.team_info.team_name) {
    return { error: 'team_name is required' }
  }
  if (!data.team_info.team_leader) {
    return { error: 'team_leader is required' }
  }
  if (!data.project_information) {
    return { error: 'project_information is required' }
  }
  return { error: null }
}

export const recruitValidate = (data: any) => {
  if (!data) {
    return { error: 'No data provided' }
  }
  if (!data.name) {
    return { error: 'name is required' }
  }
  if (!data.email) {
    return { error: 'email is required' }
  }
  if (!data.whatsapp_number) {
    return { error: 'whatsapp_number is required' }
  }
  if (!data.branch) {
    return { error: 'branch is required' }
  }
  if (!data.year_of_study) {
    return { error: 'year of study is required' }
  }
  if (!data.college_id) {
    return { error: 'admission_number is required' }
  }
  if (!data.about) {
    return { error: 'about detail is required' }
  }
  return { error: null }
}