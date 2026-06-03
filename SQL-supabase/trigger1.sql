-- Crear la función matemática que calcula el promedio ponderado
create or replace function calcular_nota_final_automatica()
returns trigger as $$
begin
    -- Formula: (Corte 1 * 0.40) + (Corte 2 * 0.60)
    new.nota_final := (new.nota_corte1 * 0.40) + (new.nota_corte2 * 0.60);
    return new;
end;
$$ language plpgsql;

-- Crear el disparador que se ejecuta antes de CUALQUIER inserción o actualización de notas
create trigger tr_calcular_nota_final
before insert or update on inscripciones_y_notas
for each row
execute function calcular_nota_final_automatica();