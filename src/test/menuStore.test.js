import { describe, it, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMenuStore } from '@/stores/menuStore'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchMenu: berhasil mengambil data', async () => {
    const dummyData = [
      {
        id: 1,
        kategori: 'Spa',
        layanan: [
          { id: 101, nama: 'Body Spa', harga: 100000 },
          { id: 102, nama: 'Hot Stone', harga: 150000 }
        ]
      }
    ]

    axios.get.mockResolvedValue({ data: dummyData })

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.daftarMenu).toEqual(dummyData)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('fetchMenu: gagal mengambil data', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.error).toBe('Gagal memuat data menu.')
    expect(store.loading).toBe(false)
  })

  it('menuByKategori: mengembalikan layanan sesuai kategori', () => {
    const store = useMenuStore()
    store.daftarMenu = [
      {
        kategori: 'Spa',
        layanan: [
          { id: 1, nama: 'Body Spa', harga: 120000 }
        ]
      },
      {
        kategori: 'Refleksi',
        layanan: [
          { id: 2, nama: 'Refleksi Kaki', harga: 80000 }
        ]
      }
    ]

    const hasil = store.menuByKategori('Refleksi')
    expect(hasil).toEqual([{ id: 2, nama: 'Refleksi Kaki', harga: 80000 }])
  })

  it('semuaLayanan: mengembalikan semua variasi layanan', () => {
    const store = useMenuStore()
    store.daftarMenu = [
      {
        kategori: 'Spa',
        layanan: [
          { id: 1, nama: 'Body Spa', harga: 120000 }
        ]
      },
      {
        kategori: 'Totok',
        layanan: [
          { id: 2, nama: 'Totok Wajah', harga: 95000 }
        ]
      }
    ]

    const hasil = store.semuaLayanan
    expect(hasil).toHaveLength(2)
    expect(hasil[0].nama).toBe('Body Spa')
    expect(hasil[1].nama).toBe('Totok Wajah')
  })
})
