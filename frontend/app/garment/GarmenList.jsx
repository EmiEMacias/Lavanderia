import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, StyleSheet } from 'react-native';
import { getGarments, createGarment, updateGarment, deleteGarment } from './garmentService';

export default function GarmenList() {
  const [garments, setGarments] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [observations, setObservations] = useState('');
  const [editing, setEditing] = useState(null);

  const loadGarments = async () => {
    const data = await getGarments();
    setGarments(data);
  };

  useEffect(() => {
    loadGarments();
  }, []);

  const handleSave = async () => {
    const garmentData = {
      order_id: Number(orderId),
      type,
      description,
      observations,
    };
    if (editing) {
      await updateGarment(editing.id, garmentData);
      setEditing(null);
    } else {
      await createGarment(garmentData);
    }
    setOrderId('');
    setType('');
    setDescription('');
    setObservations('');
    loadGarments();
  };

  const handleEdit = (garment) => {
    setEditing(garment);
    setOrderId(String(garment.order_id));
    setType(garment.type);
    setDescription(garment.description);
    setObservations(garment.observations);
  };

  const handleDelete = async (id) => {
    await deleteGarment(id);
    loadGarments();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prendas</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de Orden"
        value={orderId}
        onChangeText={setOrderId}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Observaciones"
        value={observations}
        onChangeText={setObservations}
      />
      <Button title={editing ? "Actualizar" : "Agregar"} onPress={handleSave} />
      <FlatList
        data={garments}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>
              Orden: {item.order_id} | Tipo: {item.type} | {item.description} | Obs: {item.observations}
            </Text>
            <View style={styles.actions}>
              <Button title="Editar" onPress={() => handleEdit(item)} />
              <Button title="Eliminar" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8, borderRadius: 4 },
  item: { padding: 8, borderBottomWidth: 1, borderColor: '#eee' },
  actions: { flexDirection: 'row', gap: 8, marginTop: 4 },
});
