
export type user = {
<#list sheet>
  #{sheet.name}:#{sheet.property}; //#{sheet.comment}
}  
</#list>
