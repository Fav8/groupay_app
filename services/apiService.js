const url = "http://192.168.1.179:3001/";
const apiServices = {
   register: async function(authId, userId, userName) {
    const body = { uid: userId, name: userName };
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const registered = await axios.post(url + "register", body, headers);
    return registered;
  },
  createNewGroup: async function (authId, userId, groupName) {
    const body = { uid: userId, groupName: groupName };
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const createdGroup = await axios.post(url + "groups", body, headers);
    return createdGroup;
  },
  createNewExpense: async function (authId, userId, group, expense) {
    const body = { uid: userId, group: group, expense: expense };
    const headers = {Authorization: "Bearer " + authId, 'Content-Type': 'application/json'};
    const createdExpense = await fetch(url + "expenses", {method: 'POST', body: JSON.stringify(body), headers: headers});
    return createdExpense;
  },
  cancelExpenses: async function (authId, userId, group) {
    console.log(authId);
    const cancelled = await axios.delete(url + "expenses", { headers: { Authorization: "Bearer " + authId }, data: { uid: userId, group: group}  });
    return cancelled;
  },
  getGroups: async function (authId, userId) { 
    try{
      console.log('inside get groups');
      const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
      const response = fetch(url + "groups", headers).then(res => res.json());
      return response;
    }catch(err){
      console.log('inside catch');
      console.log(err);
      return err;
    }
  },
   getGroup: async function (authId, userId, password) { 
    try{
      console.log('inside get group');
      const headers = { headers: { Authorization: "Bearer " + authId, uid: userId, password: password } };
      const response = fetch(url + "group", headers).then(res => res.json());
      return response;
    }catch(err){
      console.log('inside catch');
      console.log(err);
      return err;
    }
  },
  getUser: async function (authId, userId) { 
    const headers = { headers: { Authorization: "Bearer " + authId, uid: userId } };
    const user = await axios.get(url + "user", headers);
    return user.data;
  },
  getExpenses: async function (authId, userId, groupId) { try{
    const headers = { headers: { Authorization: "Bearer " + authId, uid: userId, groupId: groupId } };
    const response = fetch(url + "expenses", headers).then(res => res.json());
    return response;
  }catch(err){
    console.log('inside catch');
    console.log(err);
    return err;
  }
  },
  joinGroup: async function (authId, userId, password) { //TOBECHANGED with a full expense
    const body = { uid: userId, password: password};
    const headers = { headers: { Authorization: "Bearer " + authId } };
    const joinedGroup = await axios.put(url + "join", body, headers);
    return joinedGroup;
  },
}

export default apiServices