import { Link } from 'expo-router'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const digimonLogo = require("@/assets/images/DigiImagen/DigimonLogoGrande.png")
const digimonBabyI = require("@/assets/images/DigiImagen/DigimonBabyI.png")
const digimonBabyII = require("@/assets/images/DigiImagen/DigimonBaby.png")
const digimonRookie = require("@/assets/images/DigiImagen/DigimonRookie.png")
const digimonChamp = require("@/assets/images/DigiImagen/DigimonChampeon.png")
const digimonUlti = require("@/assets/images/DigiImagen/DigimonUltimate.png")
const digimonMega = require("@/assets/images/DigiImagen/DigimonMega.png")
const digimonsAll = require("@/assets/images/DigiImagen/DigimonAll.png")


const Landing = () => {
  const inset = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }} className='flex flex-col justify-center items-center'>

      <View >

        <Image source={digimonLogo} style={{ height: 200, width: 200, resizeMode: 'contain', paddingTop: 10, marginTop: 10 }} />
      </View>

      <View className='bg-green-600 rounded-tl-3xl rounded-br-3xl border'>
        <Link asChild href="/allDigimons">
          <Pressable>

            <Image source={digimonsAll} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
      </View>
      <View className='flex flex-row flex-wrap justify-center items-center'>
        <Link asChild href="/Fresh">
          <Pressable>

            <Image source={digimonBabyI} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
        <Link asChild href="/Baby">
          <Pressable>

            <Image source={digimonBabyII} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
        <Link asChild href="/rookies">
          <Pressable>
            <Image source={digimonRookie} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
        <Link asChild href="/Champions">
          <Pressable>
            <Image source={digimonChamp} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
        <Link asChild href="/ultimates">
          <Pressable>

            <Image source={digimonUlti} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
        <Link asChild href="/megas">
          <Pressable>

            <Image source={digimonMega} style={{ height: 100, width: 100 }} />
          </Pressable>
        </Link>
      </View>
    </View>
  )
}

export default Landing

