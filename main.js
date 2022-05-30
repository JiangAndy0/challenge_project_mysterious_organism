// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//function to create a pAequor organism
function pAequorFactory( num , basesArray ){

  return {
    specimenNum: num,
    dna: basesArray,

    //randomly selects and changes a base in the object's DNA , then returns the object's new DNA
    mutate() {
      const dnaIndexToChange = Math.floor(Math.random() * 15);
      const baseType = this.dna[dnaIndexToChange];

      let newBaseType;
      do {
        newBaseType = returnRandBase();
      } while (newBaseType === baseType) //keep looping until the newBaseType is different

      this.dna[dnaIndexToChange] = newBaseType; //change the base to a different base type
      return this.dna;
    },

    /*
    compares this object to  another pAequor object and returns the percentage of DNA the two objects have in common
    */
   compareDNA( pAequorOther ) {
     let commonBases = 0;
     for (let i = 0; i < this.dna.length; i++){
       if (this.dna[i] === pAequorOther.dna[i]) commonBases++;
     }
     const percentSame = (commonBases / this.dna.length ) * 100;

     //console.log(`specimen #${this.specimenNum} and specimen #${pAequorOther.specimenNum} have ${percentSame}% DNA in common.`);

     return percentSame;
   },

   //returns true if the object's dna array contains at least 60% 'C' or 'G' bases, false otherwise
   willLikelySurvive() {
     let numCG = 0;
     for( let i = 0; i < this.dna.length; i++){
       if ( this.dna[i] === 'C' || this.dna[i] === 'G') numCG++;
     }

     let percentCG = (numCG / this.dna.length) * 100;

     if ( percentCG >= 60) return true;
     return false;
   },

    /*
    returns a DNA strand that is complementary to a pAequor's DNA strand.
    As match with Ts, and vice versa
    Cs match with Gs, and vice versa
    */
   complementStrand() {
     let complementStrand = [];
     for (let i = 0; i < this.dna.length; i++){
       switch (this.dna[i]) {
        case 'A':
          complementStrand.push('T');
          break;
        case 'T':
          complementStrand.push('A');
          break;
        case 'C':
          complementStrand.push('G');
          break;
        case 'G':
          complementStrand.push('C');
          break;
        default:
          console.log('DNA strand contains invalid bases');
          break;
       }
     }

     return complementStrand;
   }

  };
}

//<==================End of pAequorFactory====================>

/*
takes a number and a starting specimen id and returns an array with that amount of pAequors
with specimen ids in the range of (specimen id => specimen id + number - 1) who can ALSO survive
in their natural environment. 
*/
function createPAequors ( num, startID ){
  const pAequors = [];
  for (let i = 0; i < num; i++){
    let pAequor;
    //keep making pAequors until we get one that will likely survive
    do {
      pAequor = pAequorFactory ( i + startID, mockUpStrand() );
    } while ( ! pAequor.willLikelySurvive() ) 
    pAequor.willLikelySurvive();
    pAequors.push(pAequor);
  }

  return pAequors;
}

/*
takes an array of pAequors and logs the two most related pAqeours
*/
function printMostRelated ( pAequorsArray ){
  let largestPercent = 0;
  let pAequor1;
  let pAequor2;
  //compare every pAequor to every other pAequor
  for( let i = 0; i < pAequorsArray.length; i++){
    for ( let j = i + 1; j < pAequorsArray.length; j++){
      let percentSame = pAequorsArray[i].compareDNA(pAequorsArray[j]);
      //if the percentage of DNA shared is larger than the correct largest percent, update info
      if (percentSame > largestPercent) {
        largestPercent = percentSame;
        pAequor1 = pAequorsArray[i];
        pAequor2 = pAequorsArray[j];
      }
    }
  }
  console.log(`The two most related pAequors in the array are Specimen #${pAequor1.specimenNum} and Specimen #${pAequor2.specimenNum}.`);
  console.log(`Specimen #${pAequor1.specimenNum} has the below DNA strand: `);
  console.log(pAequor1.dna);
  console.log(`Specimen #${pAequor2.specimenNum} has the below DNA strand: `);
  console.log(pAequor2.dna);
  console.log(`They share ${largestPercent}% of their DNA.`);

}


//create 100 instances of pAequor that can survive in their natural environment 
//specimen id ranges: 1 - 100
let pAequorsColony = createPAequors ( 100, 1 );
console.log('Every pAequor in the colony will survive in their natural environment: ');
console.log( pAequorsColony.every( pAequor => pAequor.willLikelySurvive()) ); //should print true;
let randomPAequor = pAequorsColony[29];
console.log(randomPAequor);
console.log(randomPAequor.complementStrand()); //outputs a DNA strand that is complement to randomPAequor's DNA strand;

//print the two most related specimens in the colony
printMostRelated(pAequorsColony);








