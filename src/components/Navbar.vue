<template>
    <nav class="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <!-- Logo -->
                <div class="flex items-center">
                    <span class="text-xl font-bold text-pink-600">🌸 SpaBooking</span>
                </div>

                <!-- Navigation Menu -->
                <div class="hidden md:flex space-x-6">
                    <RouterLink v-for="item in navItems" :key="item.name" :to="item.to"
                        class="text-gray-600 hover:text-pink-500 transition-colors"
                        exact-active-class="text-pink-600 font-semibold">
                        {{ item.name }}
                    </RouterLink>

                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Transaksi', to: '/transaksi' },
    { name: 'Pengerjaan', to: '/pengerjaan' },
    { name: 'Riwayat', to: '/riwayat' },
    { name: 'Laporan', to: '/laporan' }
]
</script>

<style scoped>
</style>
