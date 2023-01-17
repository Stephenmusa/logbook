function handler() {
  return {
    fields: [],
    addNewField() {
      this.fields.push({
        txt1: "",
        txt2: "",
      });
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
  };
}
