import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

interface Props{
title:string,
onPress?: () => void;

}

const Button = ({title ,onPress}:Props) => {
   
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.3} className='flex-1 min-h-14 max-h-14 rounded-md items-center justify-center bg-slate-500'>
         <View className='flex flex-row items-center justify-center'>

             <Text className='text-white font-medium'> {title}</Text>

         </View>
      </TouchableOpacity>
    </View>
  )
}

export default Button