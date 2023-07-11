import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'  
import { getDiets } from "../../redux/actions";
import style from './Form.module.css'
const { isURL } = require('validator'); //verifica si la URL es valida


const Form = () => {

    //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE //STATE
    const [form, setForm] = useState({
      name:'',
      summary:'',
      steps:'',
      healthScore:'',
      image:'',
      diets:[]
    })

    const [errors, setErrors] = useState({
      name:'',
      summary:'',
      steps:'',
      healthScore:'',
      image:'',
      diets:[]
    })

    //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS //HOOKS 
    const diets = useSelector((state) => state.diets)

    const dispatch = useDispatch()

    useEffect(() => {        
        dispatch(getDiets())   
      },[])

    //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER //HANDLER
    const changeHandler = (event) => { 
      const property = event.target.name; //cada input esta identificado para que event pueda decirle a la función quien disparó el evento
      const value = event.target.value;
      const wordCount = value.trim().split(/\s+/).length; // Contar el número de palabras
      console.log(`Número de palabras: ${wordCount}`) // Consologuear el número de palabras
      setForm({...form, [property]: value})       

      // inputsValidators
    
      if(property === 'name') nameValidate({...form, [property]: value}) //iguala la función al estado (setForm)
        else if (property === 'summary'){ summaryValidate({...form, [property]: value})}
        else if (property === 'healthScore'){ healthScoreValidate({...form, [property]: value})}
        else if (property === 'steps'){ stepsValidate({...form, [property]: value})}
        else if (property === 'image'){ imageValidate({...form, [property]: value})}      
    }
    
    const changeDiets = (event) => {
      const property = event.target.name;
      const value = event.target.value;
      const updatedDiets = [...form.diets, value];
      setForm({ ...form, diets: updatedDiets });
      if (property === 'diets') dietsValidate(updatedDiets);
    };
 

    //VALIDATES //VALIDATES //VALIDATES //VALIDATES //VALIDATES //VALIDATES //VALIDATES //VALIDATES //VALIDATES
    
    //nameValidate   
    const nameValidate = (form) => {
      if(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(form.name)){ //evalua letras, espacios, apóstrofos y guiones
        setErrors({...errors,name:''}) // Nombre escrito correctamente
      }else{
        setErrors({...errors,name:'Nombre y/o Apellido mal escrito. Ingreselo de vuelta, por favor.'}) // Avisa error
      }
      if(form.name==='') setErrors({...errors, name:' Casillero de nombre vacío. Ingrese un nombre, por favor'}) // Input vacío
        
    }

    //summaryValidate
    const summaryValidate = (form) => {
      if (/^[\s\S]{0,500}$/.test(form.summary)) {
        setErrors({ ...errors, summary: '' });
      } else {
        setErrors({ ...errors, summary: 'Hay un error en el summary. El texto debe tener máximo 500 caracteres.' });
      }
      if (form.summary === '') {
        setErrors({ ...errors, summary: 'Summary vacío. Ingrese un resumen, por favor.' });
      }
    };
     
    //healthScoreValidate    
    const healthScoreValidate = (form) => {
      if(/^([1-9]|[1-9][0-9]|100)$/.test(form.healthScore)){
        setErrors({...errors,healthScore:''}) 
      }else{
        setErrors({...errors,healthScore:' Solo se admiten valores entre 1 y 100'})
      }
       if(form.healthScore==='') setErrors({...errors, healthScore:' Health score vacío. Ingrese un puntaje, por favor'})   
    }; 
    
    //stepsValidate
    const stepsValidate = (form) => {
      if(/^[\s\S]{0,5}$/.test(form.steps)){
        setErrors({...errors,steps:''})
      }else{
        setErrors({...errors,steps:' Hay un error en steps.  El texto debe tener máximo 1000 caracteres'})
      }
       if(form.steps==='') setErrors({...errors, steps:' Steps vacío'})   
    };

    //imageValidate     
    const imageValidate = (form) => {
      if (form.image.trim() !== '') {
        if (isURL(form.image)) {
        setErrors({ ...errors, image: '' });
      } else {
        setErrors({ ...errors, image: 'URL de la imagen inválida' });
      }
      } else {
        setErrors({ ...errors, image: 'URL de la imagen vacía' });
      }
    };
    
    //dietsValidate
    const dietsValidate = (updatedDiets) => {
      const selectedDiets = updatedDiets.filter((diet) => diet !== '');
      
      if (selectedDiets.length === 2) {
        setErrors({ ...errors, diets: '' });
      } else if (selectedDiets.length === 1) {
        setErrors({ ...errors, diets: 'Debe seleccionar al menos 2 dietas' });
      } else if (selectedDiets.length > 2) {
        setErrors({ ...errors, diets: 'Debe seleccionar exactamente 2 dietas' });
      }
    };    
    
    //submitHandler    
    const submitHandler = (event) => {
      event.preventDefault();
      // setIsSubmitted(true);      
      if (errors.diets ) {
        alert('Debe completar los datos correctamente. Por favor, inténtalo de nuevo.');
      }else{ 
        axios
        .post('http://localhost:3001/recipes', form) // se busca hacer un post en la pagina que trae las recetass
        .then((res) => { 
          if(res.status >= 200 && res.status < 300){ 
            alert('Felicidades! Receta creada!') // Se guarda exitosamente
          }
        })        
        .catch((error) =>{ // Se rechaza el submit
          // console.log(error)
          alert('Hubo un error. Por favor, inténtalo de nuevo.')
        })
      }
    } 
    
    //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS //INPUTS
    return( 
      <form onSubmit={submitHandler}>

        <br />
        <br />
        
         <div className={style.label}> {/* Name */}
          <label>Name: </label>
          <input type='text'value={form.name} onChange={changeHandler} name='name'className={style.input__name}/>
          {errors.name && <span className={style.error}>{errors.name}</span>}
        </div>

        <br />
        <br />
        

        <div className={style.label}> {/* Summary */}
          <label>Summary: </label>
          <input type='text'value={form.summary} onChange={changeHandler} name='summary' className={style.input__summary}/>
          {errors.summary && <span className={style.error}>{errors.summary}</span>}
        </div>

        <br />
        <br />

        <div className={style.label}> {/* Health Score */}
          <label>Health Score: </label>
          <input type='number'value={form.healthScore} onChange={changeHandler} name='healthScore' className={style.input__healthScore}/>
          {errors.healthScore && <span className={style.error}>{errors.healthScore}</span>}
        </div>

        <br />
        <br />

        <div className={style.label}> {/* Steps */}
          <label>Steps: </label>
          <input type='text'value={form.steps} onChange={changeHandler} name='steps' className={style.input__steps}/>
          {errors.steps && <span className={style.error}>{errors.steps}</span>}
        </div>

        <br />
        <br />

        <div className={style.label}> {/* Image */}
          <label>Image: </label>
          <input type='text'value={form.image} onChange={changeHandler} name='image' className={style.input__image}/>
          {errors.image && <span className={style.error}>{errors.image}</span>}
        </div>

        <br />
        <br />
        
         <div className={style.formField}> {/* Diets */}
          <label className={style.label}>Select two diets:</label>
          <br/>
          <div>
            <select name="diets" onChange={changeDiets} className={style.select}> 
              <option value=''>Select diet...</option>
                {diets?.map((diet, index) => {
                  return <option key={diet.id} value={diet.id}> {diet.name}</option>
              } 
            )}
          </select>
          {errors.diets && <p>{errors.diets}</p>}
          </div>   

        </div>  

        <br />
        
        {/* Button Submit */}
        <button className={style.submit} type='submit' disabled={!form.name || !form.summary || !form.steps || !form.healthScore || !form.image || !form.diets}>SUBMIT</button>        
      </form> 
          
          )
        }
        
  export default Form;



             
  
  // const changeDiets = (event) => {  //codigo anterior
    //   const property = event.target.name; //cada input esta identificado para que event pueda decirle a la función quien disparó el evento
    //   const value = event.target.value;
    //   const updatedDiets = [...form.diets, value];                 
    //   setForm({...form,diets: [...form.diets,value]} )
    //   if (property === 'diets'){ dietsValidate({...form.diets, value})}  
    //   setForm({...form, diets: updatedDiets}); 
    //   if(isSubmitted && property === 'diets') dietsValidate({...form, diets: updateDiets})   
    
    
// }
    