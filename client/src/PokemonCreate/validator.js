  const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);

export function validate(input) {
    let errors = [];
    if(!input.name){
        errors.name='El atributo Nombre: es requerido';
    }else if(!/^[A-Z]+$/i.test(input.name)){
        errors.name='En el atributo Nombre: solo se permiten letras';
    }
    if(!input.hp){
        errors.hp='El atributo Vida: es requerido';
    }else if(input.hp > 1000){
        errors.hp='El atributo Vida: no puede exceder 1000';
    }else if (input.hp < 0) {
        errors.hp ='El atributo Vida: no puede ser negativo';
    }
    if(!input.attack){
        errors.attack='El atributo Ataque: es requerido';
    }else if(input.attack > 1000){
        errors.attack='El atributo Ataque: no puede exceder 1000';
    }else if (input.attack < 0) {
        errors.attack ='El atributo Ataque: no puede ser negativo';
    }
    if(!input.defense){
        errors.defense='El atributo Defensa: es requerido';
    }else if(input.defense > 1000){
        errors.defense='El atributo Defensa: no puede exceder 1000';
    }else if (input.defense < 0) {
        errors.defense ='El atributo Defensa: no puede ser negativo';
    }
    if(!input.speed){
        errors.speed='El atributo Velocidad: es requerido';
    }else if(input.speed > 1000){
        errors.speed='El atributo Velocidad: no puede exceder 1000';
    }else if (input.speed < 0) {
        errors.speed ='El atributo Velocidad: no puede ser negativo';
    }
    if(!input.height){
        errors.height='El atributo Altura: es requerido';
    }else if(input.height > 1000){
        errors.height='El atributo Altura: no puede exceder 1000';
    }else if (input.height < 0) {
        errors.height ='El atributo Altura: no puede ser negativo';
    }
    if(!input.weight){
        errors.weight='El atributo Peso: es requerido';
    }else if(input.weight > 1000){
        errors.weight='El atributo Peso: no puede exceder 1000';
    }else if (input.weight < 0) {
        errors.weight ='El atributo Peso: no puede ser negativo';
    }
    if(!input.image){
        errors.image='Una imagen es requerida';
    } 
      else if (!regex.test(input.image)){
          errors.image = 'Url de imagen invalida';
        }
    
    return errors
}