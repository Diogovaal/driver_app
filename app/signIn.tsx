import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'

const SignIn = () => {
  const handleLogin = async ()=>{
    const result = await login();

    if(result){
      console.log('Login Sucess');
    }else{
      Alert.alert('Error', 'Failed to login');
    }

  };

  return (
    <SafeAreaView className='bg-black h-full'>
        <ScrollView contentContainerClassName='h-full'>
            <Image source={images.login} className='w-full h-4/6'/>
           
           <View className='px-10'>
            
            <Text className='text-white text-center text-2xl'>Wellcome to billor</Text>
            <Text className='text-white text-center mt-2 text-3xl font-bold'>Join to us</Text>

            <Text className='text-white text-center text-lg mt-10'>Login to Billor app with google</Text>

            <TouchableOpacity onPress={handleLogin}className='bg-slate-500 shadow-md shadow-orange-300 rounded-full w-full py-4 mt-5'>
             
            <View className='flex flex-row items-center justify-center'>
                   <Image source={icons.google}
                            className='w-5 h-5'
                            resizeMode='contain'
                    />
                    <Text className='text-lg font-medium text-orange-300 ml-2'>Entrar com google</Text>
                   </View>

            </TouchableOpacity>
           </View>

        </ScrollView>

    

    </SafeAreaView>
  
  )
}

export default SignIn