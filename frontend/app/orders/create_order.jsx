import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateOrderScreen = () => {
  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(new Date());
  const [realDeliveryDate, setRealDeliveryDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ field: null, visible: false });

  const [state, setState] = useState('Recibido');
  const [menuVisible, setMenuVisible] = useState(false);

  const [total, setTotal] = useState('');
  const [pagado, setPagado] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) return setShowPicker({ field: null, visible: false });

    const { field } = showPicker;
    if (field === 'createdAt') setCreatedAt(selectedDate);
    else if (field === 'estimatedDeliveryDate') setEstimatedDeliveryDate(selectedDate);
    else if (field === 'realDeliveryDate') setRealDeliveryDate(selectedDate);

    setShowPicker({ field: null, visible: false });
  };

  const handleSubmit = async () => {
    const newOrder = {
      client_id: parseInt(clientId),
      user_id: parseInt(userId),
      created_at: createdAt.toISOString(),
      estimated_delivery_date: estimatedDeliveryDate.toISOString(),
      real_delivery_date: realDeliveryDate.toISOString(),
      state,
      total: parseFloat(total),
      pagado,
    };

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) throw new Error();
      Alert.alert('Éxito', 'Orden registrada correctamente');
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar la orden');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="ID Cliente" value={clientId} onChangeText={setClientId} style={styles.input} keyboardType="numeric" />
      <TextInput label="ID Usuario" value={userId} onChangeText={setUserId} style={styles.input} keyboardType="numeric" />

      <Button mode="outlined" onPress={() => setShowPicker({ field: 'createdAt', visible: true })}>
        Fecha de creación: {createdAt.toDateString()}
      </Button>
      <Button mode="outlined" onPress={() => setShowPicker({ field: 'estimatedDeliveryDate', visible: true })}>
        Fecha entrega estimada: {estimatedDeliveryDate.toDateString()}
      </Button>
      <Button mode="outlined" onPress={() => setShowPicker({ field: 'realDeliveryDate', visible: true })}>
        Fecha entrega real: {realDeliveryDate.toDateString()}
      </Button>

      {showPicker.visible && (
        <DateTimePicker
          value={
            showPicker.field === 'createdAt'
              ? createdAt
              : showPicker.field === 'estimatedDeliveryDate'
              ? estimatedDeliveryDate
              : realDeliveryDate
          }
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Button mode="outlined" onPress={() => setMenuVisible(true)}>
            Estado: {state}
          </Button>
        }>
        <Menu.Item onPress={() => { setState('Recibido'); setMenuVisible(false); }} title="Recibido" />
        <Menu.Item onPress={() => { setState('En proceso'); setMenuVisible(false); }} title="En proceso" />
        <Menu.Item onPress={() => { setState('Listo'); setMenuVisible(false); }} title="Listo" />
        <Menu.Item onPress={() => { setState('Entregado'); setMenuVisible(false); }} title="Entregado" />
      </Menu>

      <TextInput
        label="Total ($)"
        value={total}
        onChangeText={setTotal}
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Pagado:</Text>
        <Button
          mode={pagado ? 'contained' : 'outlined'}
          onPress={() => setPagado(!pagado)}
        >
          {pagado ? 'Sí' : 'No'}
        </Button>
      </View>

      <Button mode="contained" onPress={handleSubmit} style={{ marginTop: 20 }}>
        Crear Orden
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
});

export default CreateOrderScreen;
