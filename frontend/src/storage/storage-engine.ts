import { Preferences } from '@capacitor/preferences';
import { StateStorage } from 'zustand/middleware'

export function generateStorage(namespace: string): StateStorage {
  return {
    getItem: async (name: string): Promise<string | null> => {
        console.log(name, 'has been retrieved')
        return (await Preferences.get({key: `${namespace}-${name}`}))?.value || null
      },
      setItem: async (name: string, value: string): Promise<void> => {
        console.log(name, 'with value', value, 'has been saved')
        await Preferences.set({key: `${namespace}-${name}`, value})
      },
      removeItem: async (name: string): Promise<void> => {
        console.log(name, 'has been deleted')
        await Preferences.remove({key:  `${namespace}-${name}`})
      },
  };
}