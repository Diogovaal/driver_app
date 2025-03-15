import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { databases } from '@/lib/appwrite';
import { Query } from 'react-native-appwrite';
import { Load } from '../types/index'; // Importe a interface Load

const LoadsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loads, setLoads] = useState<Load[]>([]); // Use Load[] para tipar o array de cargas
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchLoads();
  }, [searchTerm]);

  const fetchLoads = async () => {
    try {
      const queries = [Query.orderDesc('createdAt')];
      if (searchTerm) {
        queries.push(Query.search('description', searchTerm));
      }
      const response = await databases.listDocuments<Load>( // Use <Load> para tipar a resposta
        'YOUR_DATABASE_ID',
        'loads',
        queries
      );
      setLoads(response.documents);
    } catch (error) {
      console.error('Erro ao buscar cargas:', error);
    }
  };

  const renderItem = ({ item }: { item: Load }) => ( // Tipagem do item no renderItem
    <TouchableOpacity
      className="p-4 border-b border-gray-200"
      onPress={() => navigation.navigate('LoadDetails', { loadId: item.$id })}
    >
      <Text className="text-lg font-semibold">{item.description}</Text>
      <Text>Status: {item.status}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className='bg-black h-full'>

    <View className="flex-1 bg-black items-center justify-center mt-20">
      <TextInput
        className="p-3 border text-white border-white rounded-md m-4"
        placeholder="Pesquisar cargas..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        />
      <FlatList
      className='text-white bg-white'
        data={loads}
        renderItem={renderItem}
        keyExtractor={(item) => item.$id}
        />
    </View>
        </SafeAreaView>
  );
};

export default LoadsListScreen;