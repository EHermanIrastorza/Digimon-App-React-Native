import React from 'react'
import { Image, Text, View } from 'react-native'
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
    <View style={{ paddingTop: inset.top, paddingBottom: inset.bottom }}>
      <View >
        <Image source={digimonLogo} style={{ height: 200, width: 200, resizeMode: 'contain', paddingTop: 10, marginTop: 10 }} />
      </View>
      <View>
        <Image source={digimonsAll} style={{ height: 100, width: 100 }} />
      </View>
      <View>
        <Image source={digimonBabyI} style={{ height: 100, width: 100 }} />
        <Image source={digimonBabyII} style={{ height: 100, width: 100 }} />
        <Image source={digimonRookie} style={{ height: 100, width: 100 }} />
        <Image source={digimonChamp} style={{ height: 100, width: 100 }} />
        <Image source={digimonUlti} style={{ height: 100, width: 100 }} />
        <Image source={digimonMega} style={{ height: 100, width: 100 }} />
      </View>
    </View>
  )
}

export default Landing

