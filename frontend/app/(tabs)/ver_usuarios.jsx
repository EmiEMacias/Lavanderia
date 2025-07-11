import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const API_URL = 'http://127.0.0.1:5000';

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(`${API_URL}/usuarios`);
        const data = await response.json();
        if (response.ok) {
          setUsuarios(data);
        } else {
          Alert.alert('Error', data.message || 'No se pudieron cargar los usuarios');
        }
      } catch (error) {
        Alert.alert('Error de red', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userText}>Nombre: {item.name}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Rol: {item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffeba7" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id?.toString() || item.email}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay usuarios registrados.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#f5f5f5',
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#23243a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  userText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
  },
  emptyText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});

export default VerUsuarios;