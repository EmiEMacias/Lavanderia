import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

const API_URL = 'http://127.0.0.1:5000';

const BuscarCliente = () => {
  const [search, setSearch] = useState('');
  const [cliente, setCliente] = useState(null);

  const handleSearch = async () => {
    if (!search) {
      Alert.alert('Campo vacío', 'Ingresa el nombre o teléfono del cliente.');
      return;
    }
    try {
      const response = await fetch(`${API_URL}/clientes/buscar?query=${encodeURIComponent(search)}`);
      const data = await response.json();
      if (response.ok && data) {
        setCliente(data);
      } else {
        setCliente(null);
        Alert.alert('No encontrado', data.message || 'Cliente no encontrado');
      }
    } catch (error) {
      Alert.alert('Error de red', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre o Teléfono"
        placeholderTextColor="#ccc"
        onChangeText={setSearch}
        value={search}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      {cliente && (
        <View style={styles.result}>
          <Text style={styles.resultText}>Nombre: {cliente.name}</Text>
          <Text style={styles.resultText}>Teléfono: {cliente.phone}</Text>
          <Text style={styles.resultText}>Dirección: {cliente.address}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#1f2029',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ffeba7',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: '#5e6681',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  result: {
    backgroundColor: '#23243a',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    width: '100%',
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default BuscarCliente;