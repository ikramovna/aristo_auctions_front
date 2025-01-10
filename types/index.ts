export interface IBreadcrumb {
  title: string
  link: string
}

export interface IProduct {
  id: number
  label: string
  title: string
  price: number | string
  bid: number | string
  image: string
  time: string
  time_remaining: string
  current_bid: number | string
}

export interface IFaq {
  question: string
  answer: string
}

export interface IUser {
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  contact_email: string
  contact_phone: string
  contact_telegram: string
  contact_whatsapp: string
  edu_degree: number
  edu_country: number
  edu_place: string
  edu_finished_year: number | string
  native_lang: string
  native_lang_text: string
  english_level: string | number
  study_plan_degree: number | string
  study_plan_degree_extra: number | string
  study_plan_year: number
  study_plan_univer_direction: number
  study_plan_univer: number
  study_plan_form: number
  motivational_letter: string
}

type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[]

export type TClassName = TClass | TClass[]

export type TButtonVariants = 'border' | 'orange' | 'disabled' | 'grayBorder'

export type TButtonSizes = 'sm' | 'md'
