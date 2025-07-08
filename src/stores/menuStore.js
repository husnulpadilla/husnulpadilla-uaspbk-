// src/stores/menuStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    daftarMenu: [],
    loading: false,
    error: null
  }),

  getters: {
    menuByKategori: (state) => {
      return (kategori) => {
        const kategoriItem = state.daftarMenu.find(item => item.kategori === kategori)
        return kategoriItem ? kategoriItem.layanan : []
      }
    },

    semuaLayanan: (state) => {
      return state.daftarMenu.flatMap(menu => menu.layanan)
    }
  },

  actions: {
    async fetchMenu() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:3000/menu')
        this.daftarMenu = res.data
      } catch (err) {
        this.error = 'Gagal memuat data menu.'
        console.error('❌', err)
      } finally {
        this.loading = false
      }
    }
  }
})
