import React from 'react';
// import './AboutUs.css'; // Import any necessary CSS

const AboutUs = () => {
  return (
    
    <div className="section about-us"  id="team">
            <h2 style={{    background: '#3a3a3a', padding:'20px', marginTop :'70px' , color:'white' , textAlign: 'center', fontWeight: 'bold', borderRadius:'50px',marginRight:'20px',marginLeft:'20px' , marginBottom:'80px'}}>À Propos de Nous</h2>

      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-1">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{color:'orangered'}}>
                  Qui est Steelisia ?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Steelisia est une marque tunisienne spécialisée dans le mobilier industriel, fondée pour célébrer l’art de marier deux matériaux robustes et intemporels : l’acier et le bois. Avec une première collection de 30 échantillons soigneusement conçus, Steelisia est prête à ouvrir son showroom et à présenter au public des meubles qui incarnent à la fois la durabilité et l'élégance. La marque propose une large gamme de produits, allant des tables et chaises aux lits, salons, dressings, cuisines, et plus encore, tous construits pour s’intégrer parfaitement dans des intérieurs modernes ou industriels.                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button style={{color:'orangered'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Qui sont les fondateurs de Steelisia ?                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  Steelisia est le fruit de l’alliance entre deux jeunes passionnés par le métal et le bois : Ayoub Ben Regba et Mostapha Remili . Leur force réside dans le mariage parfait entre la maîtrise technique et une vision commerciale innovante. Ensemble, ils ont créé une marque qui offre des meubles robustes, esthétiques et adaptés aux besoins du marché.

                  Avec une ambition claire, Steelisia se positionne comme une marque moderne et accessible, prête à se développer à travers des showrooms nationaux et un atelier de fabrication performant, tout en misant sur des stratégies marketing efficaces pour marquer sa présence.                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button style={{color:'orangered'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  La vision de Steelisia                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    La vision de Steelisia est de devenir une référence incontournable dans le domaine du mobilier industriel en Tunisie. Cela passe par :

                    Une production locale de qualité, grâce à un atelier de fabrication moderne qui répond aux standards du marché.
                    Une forte présence nationale, avec l’ouverture de plusieurs showrooms pour être au plus proche des clients.
                    Une stratégie marketing innovante, pour valoriser la marque et toucher un public large.
                    Steelisia aspire à transformer chaque espace en un lieu unique et chaleureux, en mettant en avant le design, la fonctionnalité et la durabilité.                  </div>
                  </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button style={{color:'orangered'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  . L’idée et la vision de Steelisia                  </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                  L’idée de Steelisia repose sur une mission simple mais ambitieuse : réinventer le mobilier industriel en mariant la robustesse du métal à l’élégance du bois. Ayoub Ben Regba et Mostapha Remili (Stoufa) ont imaginé une marque qui allie savoir-faire technique et approche commerciale moderne, pour répondre aux attentes du marché tunisien et international.                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
          <div className="section-heading">
            <h6>À Propos de Nous</h6>
            <h2>Créer des Meubles Magnifiques et Durables pour Chaque Espace</h2>
            <p>
              Nous mélangeons l'artisanat traditionnel avec des designs modernes pour créer des meubles qui reflètent votre style unique. Chaque pièce est fabriquée avec soin, garantissant qualité et beauté pour les années à venir.
            </p>
            
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
