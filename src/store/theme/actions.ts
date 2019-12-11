import { createAction } from 'typesafe-actions'
import { ThemeMode } from './ThemeWrapper'

export const updateTheme = createAction('theme/UPDATE_THEME',
(theme: ThemeMode )=> theme )<ThemeMode>()

