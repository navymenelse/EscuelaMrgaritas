-- Habilitar explícitamente que cualquiera pueda LEER los anuncios publicados
create policy "Permitir lectura pública de anuncios" 
on pizarron_anuncios 
for select 
using (true);