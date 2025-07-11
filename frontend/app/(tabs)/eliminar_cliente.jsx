import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const API_URL = 'http://127.0.0.1:5000';

const EliminarCliente = ({ route, navigation }) => {
  const { clienteId } = route.params; // Recibe el id del cliente a eliminar

  const handleDeleteClient = async () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${API_URL}/clientes/${clienteId}`, {
                method: 'DELETE',
              });
              const json = await response.json();
              if (response.ok) {
                Alert.alert('Éxito', 'Cliente eliminado correctamente');
                navigation.goBack();
              } else {
                Alert.alert('Error', json.message || 'No se pudo eliminar el cliente');
              }
            } catch (error) {
              Alert.alert('Error de red', error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eliminar Cliente</Text>
      <Text style={styles.warning}>
        ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleDeleteClient}>
        <Text style={styles.buttonText}>Eliminar Cliente</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ccc', marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: '#333' }]}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 24,
    marginBottom: 24,
  },
  warning: {
    color: '#ff4d4d',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EliminarCliente;