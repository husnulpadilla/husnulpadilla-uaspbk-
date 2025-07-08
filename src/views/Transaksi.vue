<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pt-24 px-6 pb-16">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 border border-purple-100 space-y-6">
      <h1 class="text-2xl font-bold text-purple-700">🧾 Transaksi</h1>

      <div v-if="keranjang.length > 0" class="space-y-4">
        <div v-for="(item, index) in keranjang" :key="index" class="flex justify-between items-center border-b pb-2">
          <div>
            <h3 class="font-semibold text-purple-800">{{ item.nama }}</h3>
            <p class="text-sm text-gray-500">Harga: Rp {{ item.harga.toLocaleString() }}</p>
            <p class="text-sm text-gray-500">Jumlah: {{ item.jumlah }}</p>
          </div>
          <button
            @click="hapusItem(index)"
            class="text-red-500 hover:text-red-700 text-sm"
          >
            Hapus
          </button>
        </div>

        <div class="text-right font-semibold text-lg text-purple-800">
          Total: Rp {{ totalHarga.toLocaleString() }}
        </div>

        <div class="flex flex-col gap-2">
          <input
            v-model="namaPelanggan"
            type="text"
            placeholder="Nama Pelanggan"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-purple-500"
          />
          <button
            @click="simpanTransaksi"
            class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Simpan Transaksi
          </button>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-10">
        Keranjang kosong. Silakan pilih layanan dari halaman utama.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()
const keranjang = computed(() => transaksiStore.keranjang)
const totalHarga = computed(() => transaksiStore.totalHarga)

const namaPelanggan = ref('')

const simpanTransaksi = () => {
  if (namaPelanggan.value.trim() === '') {
    alert('Masukkan nama pelanggan terlebih dahulu.')
    return
  }
  transaksiStore.simpanTransaksi(namaPelanggan.value)
  namaPelanggan.value = ''
}

const hapusItem = (index) => {
  transaksiStore.hapusDariKeranjang(index)
}
</script>
