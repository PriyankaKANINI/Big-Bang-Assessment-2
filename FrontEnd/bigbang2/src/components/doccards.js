import React from 'react';
import './doccards.css';
import NewDoctorImage from '../images/Avengers.png';
import NewDoctorImage1 from '../images/Doctor1.jpeg';
import NewDoctorImage2 from '../images/bgimg3.jpg';
import NewDoctorImage3 from '../images/bg4.jpg';
import NewDoctorImage4 from '../images/bg5.jpg';

const DocCards = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      specialization: 'Cardiology',
      experience: '10 years',
      image: NewDoctorImage, // Add the image source for the doctor here
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      specialization: 'Dermatology',
      experience: '5 years',
      image: NewDoctorImage1, // Add the image source for the doctor here
    },
    {
        id: 3,
        name: 'Dr. Yang Yang',
        specialization: 'Neurologist',
        experience: '7 years',
        image: NewDoctorImage2, // Add the image source for the doctor here
      },
      {
        id: 4,
        name: 'Dr. Sumi Smith',
        specialization: 'Pyscologist',
        experience: '8 years',
        image: NewDoctorImage3, // Add the image source for the doctor here
      },
      {
        id: 5,
        name: 'Dr. Zhao Lusi',
        specialization: 'Gynacologist',
        experience: '7 years',
        image: NewDoctorImage4, // Add the image source for the doctor here
      },
  ];

  return (
    <div className="new-doctor-cards-container">
      {doctors.map((doctor) => (
        <div className="new-doctor-card" key={doctor.id}>
          <img src={doctor.image} alt="Doctor" className="new-doctor-image" />
          <div className="new-doctor-details">
            <h3 className="new-doctor-name">{doctor.name}</h3>
            <p className="new-doctor-specialization">{doctor.specialization}</p>
            <p className="new-doctor-experience">Experience: {doctor.experience}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocCards;




// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


// import doctor1 from '../images/HappyDoc.jpeg';
// import doctor2 from '../images/MaskDoc.jpeg';
// import doctor3 from '../images/Avengers.png';
// import doctor4 from '../images/Stethescope.jpeg';
// import caro4 from '../images/TeamImage.jpeg';
//import { Link } from 'react-router-dom';
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 2000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//   };

//   return (
//     <div className="doctor-dashboard-container">
//       <h1>Welcome to Doctors Dashboard</h1><br></br>
//       <Slider {...settings}>
//         <div>
//           <img
//             src={caro4}
//             className="carouseldoctordas-image"
//           />
//         </div>
//         <div>
//           <img
//             src={doctor2}
//             className="carouseldoctordas-image"
//           />
//         </div>
//         <div>
//           <img
//             src={doctor3} 
//             className="carouseldoctordas-image"
//           />
//         </div>
//         <div>
//           <img
//             src={doctor1} 
//             className="carouseldoctordas-image"
//           />
//         </div>
//         <div>
//           <img
//             src={doctor4} 
//             className="carouseldoctordas-image"
//           />
//         </div>
//       </Slider>
//       {/* <button className="view-patients-button">
//         <Link to='/pstientsview'> View Patients
//         </Link>
//         </button>  */}
//         <h2 className='OverviewH2DoctorDas'>Casualty Department</h2>
//          <p>
//          The Emergency department which deals with Emergency conditions or provides immediate treatment.
//  In this department, patients are assessed carefully and provided immediate treatment and care before sending for further treatment in a specialised development.
//  This department is equipped to handle all kinds of emergencies and provides service 24/7 in the hospital. 
         
//          </p>
//          <br></br><br></br>
//          <h2 className='OverviewH2DoctorDas'>Operating Theatre</h2>
//          <p>
//          Operating theatre is also known as operating room or operating suite or operation suite.
//  OT deals with surgical operations where surgeons perform surgery in an aseptic environment.
//  OT rooms have well lighting, controlled humidity and temperature.
//  Operating rooms are generally supported by an anaesthetic room, preparation room, scrub room and dirty utility room.
//          </p>
//          <br></br><br></br>
//          <h2 className='OverviewH2DoctorDas'>Intensive Care Unit </h2>
//          <p>
//          Intensive care unit is also known as critical care unit (CCU), intensive treatment unit (ITU) or intensive therapy unit.
//  Intensive care unit deals with life-threatening or severe injuries and illnesses that require close monitoring from life support devices, constant care.

//  In ICU, patients are monitored and staffed by highly trained physicians, nurses and respiratory therapists.
//          </p>
//          <br></br><br></br>
//          <h2 className='OverviewH2DoctorDas'>Paediatrics Department </h2>
//          <p>
//          The paediatrics department deals with infants, children and adolescents.
//  This department deals with some significant diseases such as infectious diseases, congenital diseases, mental disorders and childhood cancer.
// In this department health care personnel are specialized and also procedures and practices are different based on the child's age group
//          </p>
//          <br></br><br></br><br></br>
//     </div>
//   );
// };

