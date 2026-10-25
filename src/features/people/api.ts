import { api, API_KEY_HEADER } from '@/lib/api'
import type { Nationality, Person, PersonInput } from '@/features/people/types'

export const peopleApi = {
  async list() {
    const { data } = await api.get<Person[]>('/list')
    return data
  },

  async findByDocument(document: string) {
    const { data } = await api.get<Person>(`/list/${encodeURIComponent(document)}`)
    return data
  },

  async create(input: PersonInput) {
    const { data } = await api.post<Person>('/registrarName', input)
    return data
  },

  async remove(id: number, apiKey: string) {
    await api.delete(`/list/${id}`, { headers: { [API_KEY_HEADER]: apiKey } })
  },

  async findNationality(document: string) {
    const { data } = await api.get<Nationality>(`/findNacionalityByPerson/${encodeURIComponent(document)}`)
    return data
  },
}
