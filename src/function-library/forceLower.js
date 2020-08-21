export default function forceLower(setter, payload, propertyName){
    setter({...payload, propertyName: payload.propertyName.toLowerCase()})
  }
