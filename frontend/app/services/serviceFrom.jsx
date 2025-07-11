import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ServiceFormScreen = ({ navigation, route = {} }) => {
  const params = route.params || {};
  const service = params.service;

  const [name, setName] = useState(service?.name || '');
  const [description, setDescription] = useState(service?.description || '');
  const [price, setPrice] = useState(service?.price?.toString() || '');
  const [garmentLink, setGarmentLink] = useState(
    service?.garment_link ? String(service.garment_link) : ''
  );

  const handleSubmit = async () => {
    const serviceData = {
      name,
      description,
      price: parseFloat(price),
      garment_link: garmentLink, 
    };

    const url = service
      ? `http://localhost:5000/api/services/${service.id}`
      : `http://localhost:5000/api/services`;

    const method = service ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!res.ok) throw new Error();

      Alert.alert('Éxito', service ? 'Servicio actualizado' : 'Servicio creado');
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'No se pudo guardar el servicio');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        label="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
        style={styles.input}
      />
      <TextInput
        label="ID de Prenda "
        value={garmentLink}
        onChangeText={setGarmentLink}
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
        {service ? 'Actualizar' : 'Guardar'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10 },
});

export default ServiceFormScreen;
