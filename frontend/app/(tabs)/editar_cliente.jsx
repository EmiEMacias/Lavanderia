import React, { useState, useEffect } from 'react';
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

const EditarCliente = ({ route, navigation }) => {
  const { clienteId } = route.params; 

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`${API_URL}/clientes/${clienteId}`);
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setPhone(data.phone);
          setAddress(data.address);
        } else {
          Alert.alert('Error', data.message || 'No se pudo cargar el cliente');
        }
      } catch (error) {
        Alert.alert('Error de red', error.message);
      }
    };
    fetchCliente();
  }, [clienteId]);

  const handleEditClient = async () => {
    if (!name || !phone || !address) {
      Alert.alert('Campos incompletos', 'Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/clientes/${clienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, address }),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Cliente actualizado correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', json.message || 'No se pudo actualizar el cliente');
      }
    } catch (error) {
      Alert.alert('Error de red', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#ccc"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#ccc"
        onChangeText={setPhone}
        value={phone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        placeholderTextColor="#ccc"
        onChangeText={setAddress}
        value={address}
      />
      <TouchableOpacity style={styles.button} onPress={handleEditClient}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
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
});

export default EditarCliente;