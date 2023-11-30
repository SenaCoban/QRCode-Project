import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { EmployeeService } from '../Service/EmployeeService';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';


const Employee = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [employee, setEmployee] = useState({
    id: 0,
    name: '',
    surname: '',
    title: '',
    email: '',
    phone: '',
    mobile_phone: '',
  });
  const [List, setList] = useState([]);
  const [selectedValue, setSelectedValue] = useState('no');
  const [qrData, setQRData] = useState('');

  useEffect(() => {
    let empDetails = new EmployeeService();
    empDetails.getAllEmployee().then((result) => setList(result.data));
  }, []);

  const handleChange = (event) => {
    let empDetails = new EmployeeService();
    empDetails.getEmployeeById(event.target.value).then((result) => setEmployee(result.data));
  };

  const handleSubmit = (event) => {
    let qrData = `İsim: ${employee.name},\nSoyisim: ${employee.surname}, \nÜnvan: ${employee.title},  \nE-posta: ${employee.email}, \nKAREL \nSabit hat: ${employee.phone}, \nWeb sitesi: https://www.karel.com.tr/`;
    if (selectedValue !== 'no') {
      qrData += `\nCep telefonu: ${employee.mobile_phone}`;
    }
    setQRData(replaceTurkishChars(qrData));
  };

  const handleRadio = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
    if (event.target.value === 'no') {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };
  const handleReset = (event) => {
    setEmployee({
      id: 0,
      name: '',
      surname: '',
      title: '',
      email: '',
      phone: '',
      mobile_phone: '',
    });
    setQRData('');
    setSelectedValue('no');
    document.getElementById('phoneNo').checked = true;
    setIsHidden(true);
  };
  

  const replaceTurkishChars = (text) => {
    const charMap = {
      'ı': 'i',
      'ğ': 'g',
      'ü': 'u',
      'ş': 's',
      'ö': 'o',
      'ç': 'c',
      'İ': 'I',
      'Ğ': 'G',
      'Ü': 'U',
      'Ş': 'S',
      'Ö': 'O',
      'Ç': 'C'
    };
    return text.replace(/[ığüşıöçİĞÜŞÖÇ]/g, (matched) => charMap[matched]);
  };

  /*const handleDownloadQRCode = () => {
    const a = document.getElementById('123').toDataURL();
    const blob = dataURLToBlob(a);
    if (blob) {
      saveAs(blob, 'qrcode.png');
    }
  }*/
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  
  const handleDownloadQRCode = async () => {

    setIsConfirmationModalOpen(true);
    
  };

  const handleConfirmation = () => {
    const a = document.getElementById('123').toDataURL();
    const blob = dataURLToBlob(a);

    if (blob) {
      saveAs(blob, 'qrcode.png');
    }

    setIsConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    setIsConfirmationModalOpen(false);
  };
  

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    if (parts.length !== 2) {
      console.error('Invalid data URL'); // Log an error
      return null; // Return null or handle the error in an appropriate way
    }

    const contentType = parts[0].split(':')[1];
    const base64Data = parts[1];
    try {
      const uint8Array = new Uint8Array(atob(base64Data).split('').map((char) => char.charCodeAt(0)));
      return new Blob([uint8Array], { type: contentType });
    } catch (error) {
      console.error('Failed to decode Base64 data:', error); // Log an error
      return null; // Return null or handle the error in an appropriate way
    }
  }
  return (
    <div style={{ marginLeft: '5%', marginRight: '5%', width: '100%', height: '100%' }}>
      <select id='liste'  className="listDropdown" placeholder='Seçiniz' value={employee.id} onChange={handleChange}>
        <option value="-1" key={-1}/*  disabled selected */>
          SEÇİNİZ
        </option>
        {List.map((emp) => (
          <option value={emp.id} key={emp.id}>
            {emp.name} {emp.surname}
          </option>
        ))}
      </select>
      <div style={{ width: '80%', height: '100%', display: 'flex', flexDirection: 'row', marginLeft: '10%', marginRight: '10%' }}>
        <div className="infoDiv">
          <div className="infoTable" /* style={{ display: 'flex', flexDirection: 'column' }} */>
            <div className="form">
              <label style={{fontWeight: 'bold'}}>Ad:</label>
              <p >{employee.name}</p>              
            </div>
            <div className="form">
              <label style={{fontWeight: 'bold'}}>Soyad:</label>
              <p>{employee.surname}</p>              
            </div>
            <div className="form">
              <label style={{fontWeight: 'bold', wordBreak: 'break-word' }}>Ünvan:</label>
              <p>{employee.title}</p>              
            </div>
            <div className="form">
              <label style={{fontWeight: 'bold', wordBreak: 'break-word' }}>E-posta:</label>
              <p>{employee.email}</p>
            </div>
            <div className="form">
              <label style={{fontWeight: 'bold'}}>Sabit Hat:</label>
              <p >{employee.phone}</p>              
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="form" style={{ display: isHidden ? 'none' : 'flex' }}>
                <label style={{fontWeight: 'bold', wordBreak: 'break-word' }}>Cep Telefonu:</label>
                <p>{employee.mobile_phone}</p>              
              </div>
              <div>
                <label style={{fontWeight: 'bold'}}>Telefon bilgisi ?</label>
                <div style={{ width: '100%' }}>
                  <input id="phoneYes" type="radio" name="phone"
                    value="yes" onChange={handleRadio} />
                  <label htmlFor="phoneYes">Evet</label>
                  <input id="phoneNo" type="radio" name="phone" value="no" onChange={handleRadio} />
                  <label htmlFor="phoneNo">Hayır</label>
                </div>
              </div>
              <br />
            </div>
          </div>
          <div>
            <button className="qrCreateButton" onClick={handleSubmit} style={{ backgroundColor: '#7fc8f8'}}>
              OLUŞTUR
            </button>
          </div>
        </div>
        <hr style={{ width: '0.1%' }} />
        <div className="qrDiv">
          <div className="QR" >
            <QRCode
              includeMargin={true}
              id='123'
              value={qrData} // QR code data

            />
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <button className="qrCreateButton" onClick={handleReset} style={{ backgroundColor: '#61dafb' }}>
              SIFIRLA
            </button>
            <button className="qrCreateButton" onClick={handleDownloadQRCode} style={{ backgroundColor: '#4396ad' }}>
              İNDİR
            </button>
            {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmationModalOpen}
        onRequestClose={handleCancel}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <p>{`"${employee.name} ${employee.surname}" adlı kişinin bilgilerini indirmek istediğinize emin misiniz?`}</p>
        <button onClick={handleConfirmation}>Evet</button>
        <button onClick={handleCancel}>Hayır</button>
      </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Employee;