import { FlatList, StyleSheet } from 'react-native';
import ExpenseItem from '../../components/ExpensesOutput/ExpenseItem';

function renderExpenseItem(itemData) {
  //itemData is an object with two properties (maybe more?) -- item and index.  The item will be the data you passed in (so might be a primitive or could be an object with several other properties, etc.)
  return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;

const styles = StyleSheet.create({});
