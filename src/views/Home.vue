<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-24 pb-16 px-6 relative">
    <!-- Tombol Keranjang -->
    <button
      @click="router.push('/transaksi')"
      class="fixed top-20 right-6 z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center"
    >
      🧺 Keranjang
      <span
        v-if="keranjangCount > 0"
        class="ml-2 bg-white text-purple-700 font-bold text-xs px-2 py-0.5 rounded-full shadow"
      >
        {{ keranjangCount }}
      </span>
    </button>

    <div class="w-full mx-auto space-y-16">
      <!-- Judul -->
      <div class="text-center">
        <h1 class="text-4xl font-extrabold text-purple-800 mb-2">Spa & Reflexology Booking</h1>
        <p class="text-gray-600 text-lg">Pilih layanan terbaik dan booking sekarang!</p>
      </div>

      <!-- Semua Layanan -->
      <div v-for="kategori in menuStore.daftarMenu" :key="kategori.id" class="space-y-4 w-full">
        <h2 class="text-2xl font-bold text-purple-700">{{ kategori.kategori }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full">
          <div
            v-for="item in kategori.variasi"
            :key="item.id"
            class="bg-white rounded-xl shadow-md border border-purple-100 p-5 flex flex-col justify-between w-full"
          >
            <div>
              <h3 class="font-bold text-purple-800 text-lg">{{ item.nama }}</h3>
              <p class="text-sm text-gray-500 mb-4">Rp {{ item.harga.toLocaleString() }}</p>
            </div>
            <button
              @click="tambahKeKeranjang(item)"
              class="mt-auto bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
import { useTransaksiStore } from '@/stores/transaksiStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const menuStore = useMenuStore()
const transaksiStore = useTransaksiStore()

onMounted(() => {
  menuStore.fetchMenu()
})

const tambahKeKeranjang = (item) => {
  transaksiStore.tambahKeKeranjang(item)
}

const keranjangCount = computed(() => transaksiStore.keranjang.length)
</script>
