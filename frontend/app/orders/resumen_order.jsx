import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Text, Divider, Button } from 'react-native-paper';

const ResumenOrdenScreen = ({ route = {}, navigation }) => {
  const params = route.params || {};
  const orderId = params.orderId;

  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define fetchOrden aquí
  const fetchOrden = async () => {
    try {
      // Cambia la URL por la de tu backend real
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (!res.ok) throw new Error('No se pudo obtener la orden');
      const data = await res.json();
      setOrden(data);
    } catch (err) {
      Alert.alert('Error', 'No se pudo cargar la orden');
      setOrden(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrden();
  }, []);

  const calcularSubtotal = (prenda) => prenda.cantidad * prenda.precioUnitario;
  const calcularTotal = () =>
    orden?.prendas?.reduce((acc, p) => acc + calcularSubtotal(p), 0) || 0;

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (!orden) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Orden no encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resumen de Orden</Text>
      <Divider style={styles.divider} />

      <Text style={styles.label}>ID Cliente: <Text style={styles.value}>{orden.client_id}</Text></Text>
      <Text style={styles.label}>ID Usuario: <Text style={styles.value}>{orden.user_id}</Text></Text>
      <Text style={styles.label}>Fecha de creación: <Text style={styles.value}>{new Date(orden.created_at).toLocaleDateString()}</Text></Text>
      <Text style={styles.label}>Entrega estimada: <Text style={styles.value}>{new Date(orden.estimated_delivery_date).toLocaleDateString()}</Text></Text>
      <Text style={styles.label}>Entrega real: <Text style={styles.value}>{orden.real_delivery_date ? new Date(orden.real_delivery_date).toLocaleDateString() : 'Pendiente'}</Text></Text>
      <Text style={styles.label}>Estado: <Text style={styles.value}>{orden.state}</Text></Text>
      <Text style={styles.label}>Total: <Text style={styles.value}>${orden.total}</Text></Text>
      <Text style={styles.label}>Pagado: <Text style={[styles.value, { color: orden.pagado ? 'green' : 'red' }]}>{orden.pagado ? 'Sí' : 'No'}</Text></Text>

      <Divider style={styles.divider} />

      <Button mode="contained" style={{ marginTop: 20 }} onPress={() => navigation.goBack()}>
        Volver
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 10,
    height: 2,
    backgroundColor: '#ccc',
  },
});

export default ResumenOrdenScreen;
