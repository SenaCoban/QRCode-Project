import React, { useEffect, useState } from 'react'
import { EmployeeService } from '../Service/EmployeeService';
import QRCode from 'react-qr-code';

export default function EmployeeDetails(e) {

  const [employee, setEmployee] = useState({
    id: 0,
    name: '',
    surname: '',
    title: '',
    phone: 0,
    mobilePhone: 0

  });
  setEmployee(e);

  const [List, setList] = useState([]);
  const [QRVal, setQRVal] = useState("htt://localhost:3000/");

  useEffect(() => {
    let empDetails = new EmployeeService();
    empDetails.getAllEmployee().then(result => setList(result.data));
  }, []);

  const handleChange = event => {
    let empDetails = new EmployeeService();
    empDetails.getEmployeeById(event.target.value).then(result => setEmployee(result.data));
    empDetails.getEmployeeById(event.target.value).then(result => setEmployee(result.data));

  };

  const handleSubmit = event => {
    const newQRValue = `http://localhost:3000/${employee.id}`;
  setQRVal(newQRValue);
  console.log('QR Kod Oluşturuldu:', newQRValue);
  };
  const handleRadio = event => {
    const selectedValue = event.target.value;
    if (selectedValue === 'yes') {
      // "Evet" seçildiyse cep telefonu numarasını göster
      setEmployee(prevEmployee => ({ ...prevEmployee, mobilePhone: e.mobilePhone }));
    } else if (selectedValue === 'no') {
      // "Hayır" seçildiğinde cep telefonu numarasını gizle (0 yap)
      setEmployee(prevEmployee => ({ ...prevEmployee, mobilePhone: 0 }));
    }
  };
  




  return (
    <div style={{ marginLeft: '5%', marginRight: '5%', width: '100%', height: '100%' }}>

      <select className='listDropdown' value={-1} onChange={() => handleChange}>
        <option value="-1" disabled hidden>Choose here</option>

        {List.map((emp) => (
          <option value={emp.id} key={emp.id}>{emp.id}{emp.name} {emp.surname}</option>
        ))}
      </select>

      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>

        <div className='infoDiv'>

          <form className='infoTable' style={{ display: 'flex', flexDirection: 'column' }}>

            <div className='form'>
              <label>Ad :</label>
              <input value={employee.name} readOnly />
            </div>

            <div className='form'>
              <label>Soyad :</label>
              <input value={employee.surname} readOnly />
            </div>

            <div className='form'>
              <label style={{ wordBreak: 'break-word' }}>Ünvan :</label>
              <input value={employee.title} readOnly />
            </div>

            <div className='form'>
              <label>Sabit Hat :</label>
              <input value={employee.phone} readOnly />
            </div>

            <div className='form' style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <label >Telefon bilgisi ?</label>
                <input id='phoneYes' type='radio' name='phone' value={'yes'} onChange={handleRadio} /><label htmlFor='phoneYes'>Evet </label>
                <input id='phoneNo' type='radio' name='phone' value={'no'} placeholder='Hayir' checked onChange={handleRadio} /><label htmlFor='phoneNo'>123</label>
              </div>
              <input id='phone' readOnly value={employee.mobilePhone} />
            </div>

            <div className='form'>
              <label>Cep Telefonu :</label>
              <input value={employee.mobilePhone} readOnly />
            </div>

          </form>


        </div>
        <hr style={{ fontSize: '7px' }} />


        <div className='qrDiv'>


          <div className='QR' >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={QRVal}
              viewBox={`0 0 256 256`}
            />
          </div>

          <div style={{ width: '100%' }}>
            <button className='qrCreateButton' onClick={() => handleSubmit}>Create QR</button>
            <button className='qrCreateButton' style={{ backgroundColor: 'blueviolet' }} >Reset</button>
          </div>

        </div>

      </div >
    </div >
  )

}