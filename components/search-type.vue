<template>
<div class="search-type">
    <div class="checkbox-btn">
        <input type="radio" checked="checked" name="searchtype">
        <button class="checkbox-btn__body"><label class="checkbox-btn__cap">Из какого фильма песня</label></button>
    </div>
    <div class="checkbox-btn">
        <input type="radio" name="searchtype">
        <button class="checkbox-btn__body"><label class="checkbox-btn__cap">Найти саундтрек к фильму</label></button>
    </div>
</div>  
</template>

<style lang="scss">
.search-type {
    display: flex;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 24px;
    margin-bottom: 40px;
}

.checkbox-btn {
    display: flex;
	cursor: pointer;
	user-select: none;
	align-items: center;
	position: relative;
	margin-right: 12px;

	&:last-child {
	    margin-right: 0px;
	}

    &__body {
        padding: 12px 16px;
        display: flex;
        align-items: center;
        color: #1C9CF7;
        font: inherit;
        border: none;
    }

    &__cap {
        border-bottom: 1px dashed #1C9CF7;
    }

    & input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;

        &:checked ~ .checkbox-btn__body {
            background: rgba(28, 156, 247, 0.12);
            border-radius: 8px;
            color: #051923;

            & .checkbox-btn__cap {
                border-bottom: none;
            }
        }

    }
}




// .dg-filter {


// 	&__cont {
// 	  display: flex;
// 	  cursor: pointer;
// 	  user-select: none;
// 	  align-items: center;
// 	  height: 32px;
// 	  position: relative;
// 	  margin-right: 12px;

// 	  &:last-child {
// 	  	margin-right: 0px;
// 	  }

// 	  & input {
// 		  position: absolute;
// 		  opacity: 0;
// 		  cursor: pointer;
// 		  width: 100%;
// 		  height: 100%;
// 	  }
// 	  & input:checked ~ .dg-filter__item {
// 	    background-color: #F2F3FB;
// 	    border-radius: 3px;
	    	  

// 	  }
// 	  & input:checked ~ .dg-filter__item label {
// 		 border-bottom: none;
// 		 color: $clr-dark-light;
// 	  }	  

// 	}

// 	& .checkbox {
// 		padding: 0px;
// 	}
// }




</style>